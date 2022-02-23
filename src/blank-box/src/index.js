import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import Command from "@ckeditor/ckeditor5-core/src/command";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { WidgetResize } from "ckeditor5/src/widget";

import { v4 as uuidv4 } from "uuid";
import "./style/index.css";
import blackCloseIcon from "./svg/black-close.svg";
import whiteCloseIcon from "./svg/white-close.svg";

const COMPONENT_NAME = "blankBox";
const COMMAND_NAME = "addBlankBox";

// khung bên ngoài chứa nhiều blankBoxEdit
const SCHEMA_BLANK_NAME = "blankBox";
const CLS_SCHEMA_BLANK = "blank-box";
const SCHEMA_BLANK_ITEM_NAME = "blankBoxItem";
const CLS_BLANK_ITEM_NAME = "blank-box-item";

// ô blankBox để nhập liệu
const SCHEMA_BLANK_EDIT_NAME = "blankBoxEdit";
const CLS_BLANK_EDIT_NAME = "blank-box-edit";

const CLS_BLANK_ITEM_CLOSE = "blank-item-close";
const CLS_BLANK_BOX_CLOSE = "blank-box-close";

const ATTRIBUTE_DATA_ID = "data-id";
const ATTRIBUTE_PARENT_ID = "parent-id";

const ATTRIBUTE_BLANK_ITEM_DATA_TEXT = "data-text";

var pointerBlankId = null  // Id của blank-box-edit đang được trỏ
var preViewElement = null
var editorWraper = null
var newEditId = null
var editAbleElementMap = {}

class BlankBox extends Plugin {
  static get requires() {
    return [BlankBoxUI, BlankBoxItemEditing, BlankBoxKeyboard];
  }
}

/**
 * Xử lý sự kiện bấm enter
 */
class BlankBoxKeyboard extends Plugin {
  static get requires() {
    return [Widget, WidgetResize];
  }
  init() {
    const me = this;
    // Handle Tab key navigation.
    this.editor.keystrokes.set("Enter", this.getEnterHandler(), {
      priority: "low",
    }); 
    this.editor.keystrokes.set("Tab", this.getEnterHandler(), {
      priority: "low",
    }); 
  }


  getEnterHandler() {
    const editor = this.editor;

    return (keyEvtData, cancel) => {
      if (
        keyEvtData.domTarget.classList.contains(CLS_BLANK_EDIT_NAME) &&
        keyEvtData.domTarget.innerText.replace('\n','')
      ) { 
        completeAnswer();
        focusBlankEditById(newEditId)
        cancel();
      }
    };
  }
}

class BlankBoxUI extends Plugin {
  init() {
    console.log("BlankBoxUI#init() got called");
    const { editor } = this;
    // if(!editorWraper) editorWraper = editor
    const t = editor.t;
    editor.ui.componentFactory.add(COMPONENT_NAME, (locale) => {
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: "Tạo ô trống",
        withText: true,
        tooltip: true,
      });

      // The state of the button will be bound to the widget command.
      const command = editor.commands.get(COMMAND_NAME);
      // Bind the state of the button to the command.
      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      // Execute the command with commandName = COMMAND_NAME when the button is clicked (executed).
      this.listenTo(buttonView, "execute", () =>{
        editor.execute(COMMAND_NAME)
      } );

      return buttonView;
    });
  }
}

class BlankBoxItemEditing extends Plugin {
  static get requires() {
    return [Widget, WidgetResize];
  }

  init() {
    const me = this;
    console.log("BlankBoxItemEditing#init() got called");

    me._defineSchema();
    me._defineConverters();

    // add InsertBlankBoxCommand vào commands với commandName = COMMAND_NAME
    me.editor.commands.add(COMMAND_NAME,new InsertBlankBoxCommand(me.editor));

    me.listenTo(
      me.editor.editing.view.document,
      "click",
      (evt, data) => {
        me._clickHandler(data.domTarget, data.domEvent);
        evt.stop();
      },
      { priority: "low" }
    );
  }


  /**
   * Xử lý xóa item
   * @param {*} element
   * @param {*} event
   */
  _clickHandler(element, event) {
    const { editor } = this;
    setEditorWraper(editor)
    if(getPointerBlankId())
      if(!element.classList.contains(CLS_BLANK_EDIT_NAME) || getPointerBlankId !== element.getAttribute(ATTRIBUTE_DATA_ID))
          completeAnswer(preViewElement)

    setPointerBlankId(null)

    if(element.classList.contains(CLS_SCHEMA_BLANK)) focusBlankEditByParentId(element.getAttribute(ATTRIBUTE_DATA_ID))

    if(element.classList.contains(CLS_BLANK_EDIT_NAME)) {
      savePreSelectorId(element.getAttribute(ATTRIBUTE_DATA_ID))
    }

    if(element.classList.contains(CLS_BLANK_ITEM_NAME)){
      let parentId = element.getAttribute(ATTRIBUTE_PARENT_ID).replace("itemParent_","")  
      focusBlankEditByParentId(parentId)
    }
    if (editor.isReadOnly === false) {
      if (
        element.nodeName.toLowerCase() === "img" &&(
        element.classList.contains(CLS_BLANK_ITEM_CLOSE) ||
        element.classList.contains(CLS_BLANK_BOX_CLOSE))
      ) {
        editor.model.change((writer) => {
          const viewElement =
            editor.editing.view.document.selection.getSelectedElement();
          const modelElOld = editor.editing.mapper.toModelElement(viewElement);
          writer.remove(modelElOld);
        });
      }
    }
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register(SCHEMA_BLANK_NAME, {
      // Allow wherever text is allowed:
      allowWhere: "$text",

      // The placeholder will act as an inline node:
      isInline: true,

      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,

      // The inline widget can have the same attributes as text (for example linkHref, bold).
      allowAttributesOf: "$text",

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$block",

      allowAttributes: [ATTRIBUTE_DATA_ID],
    });

    schema.register(SCHEMA_BLANK_EDIT_NAME, {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: SCHEMA_BLANK_NAME,

      
      // The placeholder will act as an inline node:
      isInline: true,

      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$block",


      allowAttributes: [ATTRIBUTE_DATA_ID,ATTRIBUTE_PARENT_ID],
    });

    schema.register(SCHEMA_BLANK_ITEM_NAME, {
      // Allow wherever text is allowed:
      allowWhere: "$text",
      
      // allowIn: SCHEMA_BLANK_NAME,

      // The placeholder will act as an inline node:
      isInline: true,

       // Allow content which is allowed in blocks (i.e. text with attributes).
       allowContentOf: "$block",

      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,
      // The inline widget can have the same attributes as text (for example linkHref, bold).
      allowAttributesOf: "$text",

      allowAttributes: [ATTRIBUTE_BLANK_ITEM_DATA_TEXT],
    });
  }

  _defineConverters() {
    const editor = this.editor;
    const conversion = editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: [CLS_SCHEMA_BLANK],
      },
      model: (viewElement, { writer: modelWriter }) => {
        const blankBoxId =  uuidv4()
        const editBoxId =  generateBlankEditId()
        const blankBox = modelWriter.createElement(SCHEMA_BLANK_NAME,{[ATTRIBUTE_DATA_ID]: blankBoxId});
        const blankBoxEdit = modelWriter.createElement(SCHEMA_BLANK_EDIT_NAME,
          { 
            [ATTRIBUTE_PARENT_ID] : generateEditParentId(blankBoxId),
            [ATTRIBUTE_DATA_ID] :editBoxId
          }
        );
        const data = viewElement.getAttribute("data-correct");
        let arrayCorrect = [];
        if (data) {
          arrayCorrect = JSON.parse(data);
          for (let i = 0; i < arrayCorrect.length; i++) {
            if (arrayCorrect[i]) {
              const blankBoxItem = modelWriter.createElement(
                SCHEMA_BLANK_ITEM_NAME,
                {
                  "data-text": arrayCorrect[i],
                  [ATTRIBUTE_PARENT_ID] : generateItemParentId(blankBoxId)
                }
              );
              modelWriter.append(blankBoxItem, blankBox);
            }
          }
        }
        modelWriter.append(blankBoxEdit, blankBox);

        return blankBox;
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_BLANK_NAME,
      view: (modelElement, { writer: viewWriter }) => {

        const dataCorrect = [];
        let widthInput = "40px";
        for (const blankBoxItem of modelElement.getChildren()) {
          if (blankBoxItem.name == SCHEMA_BLANK_ITEM_NAME) {
            const textData = blankBoxItem.getAttribute(
              ATTRIBUTE_BLANK_ITEM_DATA_TEXT
            ).replaceAll('"',"'");
            dataCorrect.push(textData);
          }
        }
        if (dataCorrect.length == 0) {
          return viewWriter.createContainerElement("span");
        }
  
        const widgetElement = viewWriter.createContainerElement("span", {
          class: CLS_SCHEMA_BLANK,
          [ATTRIBUTE_DATA_ID]: modelElement.getAttribute(ATTRIBUTE_DATA_ID),
          "data-correct": JSON.stringify(dataCorrect),
          style: `width: ${widthInput}`,
        });
        return widgetElement;
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_BLANK_NAME,
      view: (modelElement, { writer: viewWriter }) => {
        let itemClass = CLS_SCHEMA_BLANK
        const section = viewWriter.createContainerElement("span", {
          class: itemClass,
          [ATTRIBUTE_DATA_ID] : modelElement.getAttribute(ATTRIBUTE_DATA_ID)
        });

          const closeButton = viewWriter.createContainerElement("img", {
            class: CLS_BLANK_BOX_CLOSE,
            src: "data:image/svg+xml;charset=utf8," + escape(whiteCloseIcon),
          });
  
          const position = viewWriter.createPositionAt(section, 0);
          viewWriter.insert(position, closeButton);
        return toWidget(section, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_BLANK_EDIT_NAME,
      view: (modelElement, { writer: viewWriter }) => {
        return viewWriter.createContainerElement("span");
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_BLANK_EDIT_NAME,
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const dataId = modelElement.getAttribute(ATTRIBUTE_DATA_ID);
        const parentId = modelElement.getAttribute(ATTRIBUTE_PARENT_ID);
        const dataText = modelElement.getAttribute(ATTRIBUTE_BLANK_ITEM_DATA_TEXT)
        const config = {
          [ATTRIBUTE_DATA_ID] :dataId,
          [ATTRIBUTE_PARENT_ID]: parentId
        };
        let itemclass = CLS_BLANK_EDIT_NAME
        config["class"] = itemclass
        const element = viewWriter.createEditableElement("span", config);
        editAbleElementMap[dataId] = element

        return toWidgetEditable(element, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_BLANK_ITEM_NAME,
      view: (modelElement, { writer: viewWriter }) => {

        return viewWriter.createContainerElement("span");
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_BLANK_ITEM_NAME,
      view: (modelElement, { writer: viewWriter }) => {
        let itemClass = CLS_BLANK_ITEM_NAME
        const placeholderView = viewWriter.createContainerElement("span", {
          class: itemClass,
          [ATTRIBUTE_PARENT_ID] : modelElement.getAttribute(ATTRIBUTE_PARENT_ID)
        });

        const innerText = viewWriter.createText(
          modelElement.getAttribute(ATTRIBUTE_BLANK_ITEM_DATA_TEXT)
        );
        const position = viewWriter.createPositionAt(placeholderView, 0);
          const closeButton = viewWriter.createContainerElement("img", {
            class: CLS_BLANK_ITEM_CLOSE,
            src: "data:image/svg+xml;charset=utf8," + escape(blackCloseIcon),
          });
          viewWriter.insert(position, closeButton);
        viewWriter.insert(position, innerText);

        return toWidget(placeholderView, viewWriter);
      },
    });
  }
}

class InsertBlankBoxCommand extends Command {
  execute() {
    const editor = this.editor
    const editorModel = editor.model;
    if(!pointerBlankId) {
      editorModel.change((writer) => {
      editorModel.insertContent(createBlankBox(writer));
      });
      focusBlankEditById(newEditId);
    }    
  }

}

function completeAnswer(viewElement){
  console.log("blank-box completeAnswer")
  debugger
  const editor = editorWraper;
  const blankEditId = generateBlankEditId();
  if(!viewElement) viewElement = editor.editing.view.document.selection.editableElement;
  if(viewElement._children.length > 0){
    editor.model.change((writer) => {
      const modelBlankEdit = editor.editing.mapper.toModelElement(viewElement);
      console.log(modelBlankEdit,editor,viewElement)
      const firstChildElement = viewElement.getChild(0);
      const textData = firstChildElement._textData.trim();
      let modelBlankItem;
      let parentId = viewElement.getAttribute(ATTRIBUTE_PARENT_ID).replace("editParent_","")
      modelBlankItem = writer.createElement(SCHEMA_BLANK_ITEM_NAME, {
        "data-text": textData,
        [ATTRIBUTE_PARENT_ID] : generateItemParentId(parentId)
      });
      
      const modelBlankEditNew = writer.createElement(
        SCHEMA_BLANK_EDIT_NAME,

        { 
          [ATTRIBUTE_DATA_ID] : blankEditId,
          [ATTRIBUTE_PARENT_ID] : generateEditParentId(parentId)
        }
      );
      writer.insert(modelBlankEditNew, modelBlankEdit, "after");
      newEditId = blankEditId;
      writer.insert(modelBlankItem, modelBlankEdit, "before");
      writer.remove(modelBlankEdit);
      return modelBlankItem;
    });
  }
}

function savePreSelector(editableElement){
  preViewElement = editableElement
}

function savePreSelectorId(Id){
  setPointerBlankId(Id)
  savePreSelector(editAbleElementMap[Id])
}


function generateBlankEditId() {
  return "blankBoxEdit_" + uuidv4();
}
function generateEditParentId(id) {
  return "editParent_" + id;
}
function generateItemParentId(id) {
  return "itemParent_" + id;
}


function focusBlankEditById(dataId) {
  const selector = `span[${ATTRIBUTE_DATA_ID}="${dataId}"]`;
  setTimeout(() => {
    document.querySelector(selector).focus();
  });
  savePreSelectorId(dataId)
}

function focusBlankEditByParentId(id){
  const selector = `span[${ATTRIBUTE_PARENT_ID}="editParent_${id}"]`;
  setTimeout(() => {
    document.querySelector(selector).focus();
  });
  savePreSelectorId(document.querySelector(selector).getAttribute(ATTRIBUTE_DATA_ID))
}

function createBlankBox(writer) {
  const blankEditId = generateBlankEditId(); 
  const blankBoxId = uuidv4(); 
  newEditId = blankEditId
  let blankBox = writer.createElement(SCHEMA_BLANK_NAME, {
    [ATTRIBUTE_DATA_ID] : blankBoxId
  });

  let blankBoxEdit = writer.createElement(SCHEMA_BLANK_EDIT_NAME,
    { 
      [ATTRIBUTE_DATA_ID] : blankEditId,
      [ATTRIBUTE_PARENT_ID] : generateEditParentId(blankBoxId)
    }
  );
  writer.append(blankBoxEdit, blankBox);
  return blankBox;
}

function setPointerBlankId(_pointerBlankId){
  pointerBlankId = _pointerBlankId
}

function getPointerBlankId(){
  return pointerBlankId;
}

function setEditorWraper(editor){
  editorWraper = editor
}
export default BlankBox;
