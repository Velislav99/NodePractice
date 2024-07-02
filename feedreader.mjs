import { getLinks, saveLinks} from  './feed-manager.mjs';
import {question, close} from './rl.mjs';
import https from 'https';

const feeds = await getLinks();

let input = await question('Enter a command (list, add, del, read, exit): '); 

while (input !== 'exit'){
    let cmdParts = input.trim().split(' ');
    let cmd = cmdParts[0];

    if (cmd === 'list'){
        feeds.forEach((url, index) => console.log(`${index}: ${url}`));
    }
   
    //add ulr
    if (cmd === 'add'){
        if (cmdParts.length < 2){
            console.log('Please provide a URL');
        }else{
            feeds.push(cmdParts[1]);
        }
    }
    //delete index
    if (cmd === 'del'){
        if (cmdParts.length < 2){
            console.log('Please provide the index of a URL');
        }else{
            let index = parseInt(cmdParts[1], 10);

            if (index > -1 && index < feeds.length){
                feeds.splice(index, 1);
            }else{
                console.log('Invalid index');
            }
        }
    }
    //read index
    if (cmd === 'read'){
        https.get('https://www.reddit.com/r/javascript.rss', (response) =>{
            let content = '';

            response.on('data', (chunk) => {
                content += chunk;
            });

            response.on('end', () => {
                console.log(content);
            });
        })
    }

    input = await question('Enter a command (list, add, del, read, exit): '); 

}

await saveLinks(feeds);

close();