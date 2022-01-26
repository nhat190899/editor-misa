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

        editor.plugins.get( 'Emoji' ).addItems( '⚽',
            [
                { title: 'Person in Suit Levitating', character: '🕴️' },
                { title: 'Person Climbing', character: '🧗' },
                { title: 'Person Fencing', character: '🤺' },
                { title: 'Horse Racing', character: '🏇' },
                { title: 'Skier', character: '⛷️' },
                { title: 'Snowboarder', character: '🏂' },
                { title: 'Person Golfing', character: '🏌️' },
                { title: 'Person Surfing', character: '🏄' },
                { title: 'Person Rowing Boat', character: '🚣' },
                { title: 'Person Swimming', character: '🏊' },
                { title: 'Person Bouncing Ball', character: '⛹️' },
                { title: 'Person Lifting Weights', character: '🏋️' },
                { title: 'Person Biking', character: '🚴' },
                { title: 'Person Mountain Biking', character: '🚵' },
                { title: 'Person Cartwheeling', character: '🤸' },
                { title: 'People Wrestling', character: '🤼' },
                { title: 'Person Playing Water Polo', character: '🤽' },
                { title: 'Person Playing Handball', character: '🤾' },
                { title: 'Person Juggling', character: '🤹' },
                { title: 'Person in Lotus Position', character: '🧘' },
                { title: 'Circus Tent', character: '🎪' },
                { title: 'Skateboard', character: '🛹' },
                { title: 'Canoe', character: '🛶' },
                { title: 'Reminder Ribbon', character: '🎗️' },
                { title: 'Admission Tickets', character: '🎟️' },
                { title: 'Ticket', character: '🎫' },
                { title: 'Military Medal', character: '🎖️' },
                { title: 'Trophy', character: '🏆' },
                { title: 'Sports Medal', character: '🏅' },
                { title: '1st Place Medal', character: '🥇' },
                { title: '2nd Place Medal', character: '🥈' },
                { title: '3rd Place Medal', character: '🥉' },
                { title: 'Soccer Ball', character: '⚽' }, 
                { title: 'Baseball', character: '⚾' },
                { title: 'Softball', character: '🥎' },
                { title: 'Basketball', character: '🏀' },
                { title: 'Volleyball', character: '🏐' },
                { title: 'American Football', character: '🏈' },
                { title: 'Rugby Football', character: '🏉' },
                { title: 'Tennis', character: '🎾' },
                { title: 'Flying Disc', character: '🥏' },
                { title: 'Bowling', character: '🎳' },
                { title: 'Cricket Game', character: '🏏' },
                { title: 'Field Hockey', character: '🏑' },
                { title: 'Ice Hockey', character: '🏒' },
                { title: 'Lacrosse', character: '🥍' },
                { title: 'Ping Pong', character: '🏓' }, 
                { title: 'Badminton', character: '🏸' }, 
                { title: 'Boxing Glove', character: '🥊' }, 
                { title: 'Martial Arts Uniform', character: '🥋' }, 
                { title: 'Goal Net', character: '🥅' }, 
                { title: 'Flag in Hole', character: '⛳' }, 
                { title: 'Ice Skate', character: '⛸️' }, 
                { title: 'Fishing Pole', character: '🎣' }, 
                { title: 'Running Shirt', character: '🎽' }, 
                { title: 'Skis', character: '🎿' }, 
                { title: 'Sled', character: '🛷' }, 
                { title: 'Curling Stone', character: '🥌' }, 
                { title: 'Direct Hit', character: '🎯' }, 
                { title: 'Pool 8 Ball', character: '🎱' }, 
                { title: 'Video Game', character: '🎮' }, 
                { title: 'Slot Machine', character: '🎰' }, 
                { title: 'Game Die', character: '🎲' }, 
                { title: 'Puzzle Piece', character: '🧩' }, 
                { title: 'Chess Pawn', character: '♟️' }, 
                { title: 'Performing Arts', character: '🎭' }, 
                { title: 'Artist Palette', character: '🎨' }, 
                { title: 'Thread', character: '🧵' }, 
                { title: 'Yarn', character: '🧶' }, 
                { title: 'Musical Score', character: '🎼' }, 
                { title: 'Microphone', character: '🎤' }, 
                { title: 'Headphone', character: '🎧' }, 
                { title: 'Saxophone', character: '🎷' }, 
                { title: 'Guitar', character: '🎸' }, 
                { title: 'Musical Keyboard', character: '🎹' }, 
                { title: 'Trumpet', character: '🎺' }, 
                { title: 'Violin', character: '🎻' }, 
                { title: 'Drum', character: '🥁' }, 
                { title: 'Clapper Board', character: '🎬' }, 
                { title: 'Bow and Arrow', character: '🏹' },
            ]
        )}
}
