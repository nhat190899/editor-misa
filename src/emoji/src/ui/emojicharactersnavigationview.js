import { Collection } from 'ckeditor5/src/utils';
import { Model, FormHeaderView, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import '../../theme/emojilistview.css';
let nhatValue = '😃'
let listTypeCharacter = []

export default class EmojiCharactersNavigationView extends FormHeaderView {

	constructor( locale, groupNames ) {
		super( locale );

		const t = locale.t;

		this.set( 'class', 'ck-special-characters-navigation' );
		
		// this.groupDropdownView = this._createGroupDropdown( groupNames );
		// this.groupDropdownView.panelPosition = locale.uiLanguageDirection === 'rtl' ? 'se' : 'sw';

		/**
		 * @inheritDoc
		 */
		// this.label = t( 'Emoji' );

		/**
		 * @inheritDoc
		 */
		// this.children.add( this.groupDropdownView );

		// this._createTabTypeCharacter(groupNames)

		this.valueTypeCharacter = '🍔'
		this.focusTracker = new FocusTracker();

		/**
		 * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler}
		 */
		this.keystrokes = new KeystrokeHandler();
		this.emojiButtonViews = new ViewCollection( locale );
		this.emojiButtonPeopleViews = new ViewCollection( locale );
		this.emojiButtonNatureViews = new ViewCollection( locale );
		this.emojiButtonFoodViews = new ViewCollection( locale );
		this.emojiButtonTravelViews = new ViewCollection( locale );
		this.emojiButtonActivitiesViews = new ViewCollection( locale );
		this.emojiButtonSymbolsViews = new ViewCollection( locale );
		this.emojiButtonObjectsViews = new ViewCollection( locale );
		this.emojiButtonFlagsViews = new ViewCollection( locale );

		groupNames.forEach(emoji => {
			if(emoji === '😃'){
				this.emojiButtonPeopleViews.add( this._createButton( emoji, '😃' ) );
			}

			if(emoji === '🐻'){
				this.emojiButtonNatureViews.add( this._createButton( emoji, '🐻' ) );
			}

			if(emoji === '🍔'){
				this.emojiButtonFoodViews.add( this._createButton( emoji, '🍔' ) );
			}

			if(emoji === '🚀'){
				this.emojiButtonTravelViews.add( this._createButton( emoji, '🚀') );
			}

			if(emoji === '⚽'){
				this.emojiButtonActivitiesViews.add( this._createButton( emoji, '⚽' ) );
			}

			if(emoji === '❤️'){
				this.emojiButtonSymbolsViews.add( this._createButton( emoji, '❤️' ) );
			}

			if(emoji === '💡'){
				this.emojiButtonObjectsViews.add( this._createButton( emoji, '💡') );
			}

			if(emoji === '🎌'){
				this.emojiButtonFlagsViews.add( this._createButton( emoji, '🎌') );
			}
		})

		this._focusables = new ViewCollection();

		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate form fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate form fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		this.setTemplate( {
			tag: 'form',

			attributes: {
				class: [
					'ck-emoji',
				],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: [
				// {
				// 	tag: 'nav',

				// 	attributes: {
				// 		class: [
				// 			'ck-emoji__tab',
				// 		]
				// 	},

				// 	children: [
				// 		{
				// 			tag: 'div',

				// 			attributes: {
				// 				class: [
				// 					'nav',
				// 					'nav-tabs'
				// 				],
				// 				id: 'nav-tab',
				// 				role: 'tablist'
				// 			},
				// 			children: [
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link',
				// 							'active'
				// 						],
				// 						href: '#nav-people',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-people',
				// 						'aria-selected': true
				// 					},

				// 					children: [
				// 						'😃'
				// 					]


				// 				},
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link'
				// 						],
				// 						href: '#nav-nature',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-nature',
				// 						'aria-selected': false
				// 					},
				// 					children: [
				// 						'🐻'
				// 					]

				// 				},
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link'
				// 						],
				// 						href: '#nav-food',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-food',
				// 						'aria-selected': false
				// 					},
				// 					children: [
				// 						'🍔'
				// 					]

				// 				},
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link'
				// 						],
				// 						href: '#nav-travel',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-travel',
				// 						'aria-selected': false
				// 					},

				// 					children: [
				// 						'🌇'
				// 					]

				// 				},
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link'
				// 						],
				// 						href: '#nav-activities',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-activities',
				// 						'aria-selected': false
				// 					},

				// 					children: [
				// 						'⚽'
				// 					]

				// 				},
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link'
				// 						],
				// 						href: '#nav-objects',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-objects',
				// 						'aria-selected': false
				// 					},

				// 					children: [
				// 						'💡'
				// 					]

				// 				},
				// 				{
				// 					tag: 'a',

				// 					attributes: {
				// 						class: [
				// 							'nav-item',
				// 							'nav-link'
				// 						],
				// 						href: '#nav-flags',
				// 						role: 'tab',
				// 						'data-toggle': 'tab',
				// 						'aria-controls': 'nav-flags',
				// 						'aria-selected': false
				// 					},

				// 					children: [
				// 						'🎌'
				// 					]

				// 				},


				// 			]
				// 		}
				// 	]
				// },
				{
					tag: 'div',

					attributes: {
						class: [
							'tab-content'
						],
						id: 'nav-tabContent'
					},
					children: [
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade',
									'show',
									'in',
									'active'
								],
								id: 'nav-people',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonPeopleViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-nature',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonNatureViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-food',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonFoodViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-travel',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonTravelViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-activities',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonActivitiesViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-objects',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonObjectsViews
								}
							]
						},
						{
							tag: 'div',

							attributes: {
								class: [
									'tab-pane',
									'fade'
								],
								id: 'nav-symbols',
								role: 'tabpanel',
							},
							children: [
								{
									tag: 'div',

									attributes: {
										class: [
											'ck-emoji__actions'
										]
									},
									children: this.emojiButtonSymbolsViews
								}
							]
						}
					]
				}
			]
		} );
	}

	
	/**
	 * Returns the name of the character group currently selected in the {@link #groupDropdownView}.
	 *
	 * @returns {String}
	 */
	get currentGroupName() {
		return nhatValue;
	}

	_createGroupDropdown( groupNames ) {
		const locale = this.locale;
		const t = locale.t;
		const dropdown = createDropdown( locale );
		const groupDefinitions = this._getCharacterGroupListItemDefinitions( dropdown, groupNames );

		dropdown.set( 'value', groupDefinitions.first.model.label );
		dropdown.buttonView.bind( 'label' ).to( dropdown, 'value' );

		dropdown.buttonView.set( {
			isOn: false,
			withText: true,
			tooltip: t( 'Emoji categories' ),
			class: [ 'ck-dropdown__button_label-width_auto' ]
		} );

		dropdown.on( 'execute', evt => {
			dropdown.value = evt.source.label;
		} );

		dropdown.delegate( 'execute' ).to( this );

		addListToDropdown( dropdown, groupDefinitions );

		return dropdown;
	}

	/**
	 * Returns list item definitions to be used in the character group dropdown
	 * representing specific character groups.
	 *
	 */
	_getCharacterGroupListItemDefinitions( dropdown, groupNames ) {
		const groupDefs = new Collection();
		for ( const name of groupNames ) {
			const definition = {
				type: 'button',
				model: new Model( {
					label: name,
					withText: true
				} )
			};

			definition.model.bind( 'isOn' ).to( dropdown, 'value', value => {
				return value === definition.model.label;
			} );

			groupDefs.add( definition );
		}

		return groupDefs;
	}

	_createTabTypeCharacter(groupNames){
		const locale = this.locale;
		this.testDropdown = createDropdown( locale );
		for ( const name of groupNames ) {
			let definition = {
				type: 'button',
				model: new Model( {
					label: name,
					withText: true
				} )
			};
			definition.model.bind( 'isOn' ).to( this.testDropdown, 'value', value => {
				return value === definition.model.label;
			} );
			this.children.add(definition)
		}
	}

	_createButton( label, eventName ) {
		const button = new ButtonView( this.locale );
		listTypeCharacter.push(button)
		button.label = label;
		button.withText = true;
		if(label === '😃') button.class='character-type__active'
		button.on('execute',(  ) => {
			nhatValue = label
			listTypeCharacter.forEach(eachButton => {
				eachButton.class = ''
				button.class = 'character-type__active'
			})
		})

		if ( eventName ) {
			button.delegate( 'execute' ).to( this)
		}

		return button;
	}
	
	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		this.emojiButtonViews.map( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );
	}

	/**
	 * Focuses the fist {@link #_focusables} in the form.
	 */
	focus() {
		this._focusCycler.focusFirst();
	}
}