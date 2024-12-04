export const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    const error = new Error();
    const stackLine = error.stack?.split('\n')[2];
    const match = stackLine?.match(/\((.+)\)/)?.[1] || stackLine?.trim();
    
    // Clean up the file path - remove both webpack and full system paths
    const cleanPath = match?.replace(
      /(webpack-internal:\/\/\/\(app-pages-browser\)\/\.|C:\\Users\\user\\Desktop\\aura-swap\\)/g, 
      ''
    );
    
    // Log format: message [filepath]
    console.log(...args, `[${cleanPath}]`);
  }
}; 