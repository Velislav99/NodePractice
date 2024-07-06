process.stdin.on('data', (chunk) => {
   const input = chunk.toString().trim()

   if (input === 'exit') {
      process.exit(0);
   }

   
})

process.stdout.write('Enter your simple equation: ');