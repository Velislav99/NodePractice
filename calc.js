process.stdin.on('data', (chunk) => {
   const input = chunk.toString().trim()

   if (input === 'exit') {
      process.exit(0);
   }

   try {
      const value = eval(input);
      console.log(value);
   } catch (e) {
      console.log('Invalid equation');
      
   }
   process.stdout.write('Enter your simple equation: ');
})

process.stdout.write('Enter your simple equation: ');