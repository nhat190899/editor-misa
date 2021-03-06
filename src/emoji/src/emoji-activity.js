import { Plugin } from 'ckeditor5/src/core';

export default class EmojiActivity extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'EmojiActivity';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.plugins.get( 'Emoji' ).addItems( 'โฝ',
            [
                { title: 'Person in Suit Levitating', character: '๐ด๏ธ' },
                { title: 'Person Climbing', character: '๐ง' },
                { title: 'Person Fencing', character: '๐คบ' },
                { title: 'Horse Racing', character: '๐' },
                { title: 'Skier', character: 'โท๏ธ' },
                { title: 'Snowboarder', character: '๐' },
                { title: 'Person Golfing', character: '๐๏ธ' },
                { title: 'Person Surfing', character: '๐' },
                { title: 'Person Rowing Boat', character: '๐ฃ' },
                { title: 'Person Swimming', character: '๐' },
                { title: 'Person Bouncing Ball', character: 'โน๏ธ' },
                { title: 'Person Lifting Weights', character: '๐๏ธ' },
                { title: 'Person Biking', character: '๐ด' },
                { title: 'Person Mountain Biking', character: '๐ต' },
                { title: 'Person Cartwheeling', character: '๐คธ' },
                { title: 'People Wrestling', character: '๐คผ' },
                { title: 'Person Playing Water Polo', character: '๐คฝ' },
                { title: 'Person Playing Handball', character: '๐คพ' },
                { title: 'Person Juggling', character: '๐คน' },
                { title: 'Person in Lotus Position', character: '๐ง' },
                { title: 'Circus Tent', character: '๐ช' },
                { title: 'Skateboard', character: '๐น' },
                { title: 'Canoe', character: '๐ถ' },
                { title: 'Reminder Ribbon', character: '๐๏ธ' },
                { title: 'Admission Tickets', character: '๐๏ธ' },
                { title: 'Ticket', character: '๐ซ' },
                { title: 'Military Medal', character: '๐๏ธ' },
                { title: 'Trophy', character: '๐' },
                { title: 'Sports Medal', character: '๐' },
                { title: '1st Place Medal', character: '๐ฅ' },
                { title: '2nd Place Medal', character: '๐ฅ' },
                { title: '3rd Place Medal', character: '๐ฅ' },
                { title: 'Soccer Ball', character: 'โฝ' }, 
                { title: 'Baseball', character: 'โพ' },
                { title: 'Softball', character: '๐ฅ' },
                { title: 'Basketball', character: '๐' },
                { title: 'Volleyball', character: '๐' },
                { title: 'American Football', character: '๐' },
                { title: 'Rugby Football', character: '๐' },
                { title: 'Tennis', character: '๐พ' },
                { title: 'Flying Disc', character: '๐ฅ' },
                { title: 'Bowling', character: '๐ณ' },
                { title: 'Cricket Game', character: '๐' },
                { title: 'Field Hockey', character: '๐' },
                { title: 'Ice Hockey', character: '๐' },
                { title: 'Lacrosse', character: '๐ฅ' },
                { title: 'Ping Pong', character: '๐' }, 
                { title: 'Badminton', character: '๐ธ' }, 
                { title: 'Boxing Glove', character: '๐ฅ' }, 
                { title: 'Martial Arts Uniform', character: '๐ฅ' }, 
                { title: 'Goal Net', character: '๐ฅ' }, 
                { title: 'Flag in Hole', character: 'โณ' }, 
                { title: 'Ice Skate', character: 'โธ๏ธ' }, 
                { title: 'Fishing Pole', character: '๐ฃ' }, 
                { title: 'Running Shirt', character: '๐ฝ' }, 
                { title: 'Skis', character: '๐ฟ' }, 
                { title: 'Sled', character: '๐ท' }, 
                { title: 'Curling Stone', character: '๐ฅ' }, 
                { title: 'Direct Hit', character: '๐ฏ' }, 
                { title: 'Pool 8 Ball', character: '๐ฑ' }, 
                { title: 'Video Game', character: '๐ฎ' }, 
                { title: 'Slot Machine', character: '๐ฐ' }, 
                { title: 'Game Die', character: '๐ฒ' }, 
                { title: 'Puzzle Piece', character: '๐งฉ' }, 
                { title: 'Chess Pawn', character: 'โ๏ธ' }, 
                { title: 'Performing Arts', character: '๐ญ' }, 
                { title: 'Artist Palette', character: '๐จ' }, 
                { title: 'Thread', character: '๐งต' }, 
                { title: 'Yarn', character: '๐งถ' }, 
                { title: 'Musical Score', character: '๐ผ' }, 
                { title: 'Microphone', character: '๐ค' }, 
                { title: 'Headphone', character: '๐ง' }, 
                { title: 'Saxophone', character: '๐ท' }, 
                { title: 'Guitar', character: '๐ธ' }, 
                { title: 'Musical Keyboard', character: '๐น' }, 
                { title: 'Trumpet', character: '๐บ' }, 
                { title: 'Violin', character: '๐ป' }, 
                { title: 'Drum', character: '๐ฅ' }, 
                { title: 'Clapper Board', character: '๐ฌ' }, 
                { title: 'Bow and Arrow', character: '๐น' },
            ]
        )}
}
