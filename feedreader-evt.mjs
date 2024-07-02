import { getLinks, saveLinks } from './feed-manager.mjs';
import { rl, close } from './rl.mjs';
import axios from 'axios';
import Parser from 'rss-parser';
import { EventEmitter } from 'events';

const feeds = await getLinks();
const parser = new Parser();
const emitter = new EventEmitter();

function prompt() {
    rl.setPrompt('Enter a command (list, add, del, read, exit): ');
    rl.prompt();
}

rl.on('line', async (input) => {
    let cmdParts = input.trim().split(' ');

    emitter.emit(cmdParts[0], cmdParts[1]);
});

emitter.on('exit', async () => {

    await saveLinks(feeds);

    close();
})

emitter.on('list', () => {

    feeds.forEach((url, index) => console.log(`${index}: ${url}`));
    prompt();
})
emitter.on('add', (url) => {


    if (url === undefined) {
        console.log('Please provide a URL');
    } else {
        feeds.push(url);
    }

    prompt();
})

emitter.on('del', (index) => {

    if (index === undefined) {
        console.log('Please provide the index of a URL');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            feeds.splice(index, 1);
        } else {
            console.log('Invalid index');
        }
    }
    prompt();

})
emitter.on('read', async (index) => {

    if (index === undefined) {
        console.log('Please provide the index of a URL');
    } else {
        index = parseInt(index, 10);

        if (index > -1 && index < feeds.length) {
            let { data } = await axios.get(feeds[index]);

            let feed = await parser.parseString(data);

            feed.items.forEach(item => { console.log(item.title); });
        } else {
            console.log('Invalid index');
        }
    }
    prompt();

})

prompt();

// while (input !== 'exit') {

//     let cmd = cmdParts[0];

//     if (cmd === 'list') {
//         feeds.forEach((url, index) => console.log(`${index}: ${url}`));
//     }

//     //add ulr
//     if (cmd === 'add') {
//         if (cmdParts.length < 2) {
//             console.log('Please provide a URL');
//         } else {
//             feeds.push(cmdParts[1]);
//         }
//     }
//     //delete index
//     if (cmd === 'del') {
//         if (cmdParts.length < 2) {
//             console.log('Please provide the index of a URL');
//         } else {
//             let index = parseInt(cmdParts[1], 10);

//             if (index > -1 && index < feeds.length) {
//                 feeds.splice(index, 1);
//             } else {
//                 console.log('Invalid index');
//             }
//         }
//     }
//     //read index
//     if (cmd === 'read') {
//         if (cmdParts.length < 2) {
//             console.log('Please provide the index of a URL to read');
//         } else {
//             let index = parseInt(cmdParts[1], 10);

//             if (index > -1 && index < feeds.length) {
//                 let { data } = await axios.get('https://www.reddit.com/r/node.rss');

//                 let feed = await parser.parseString(data);

//                 feed.items.forEach(item => { console.log(item.title); });
//             } else {
//                 console.log('Invalid index');
//             }
//         }
//     }

//     input = await question('Enter a command (list, add, del, read, exit): ');

//}
