#### fs.existsSync(path); 
> 如果文件存在，则返回 true，否则返回 false。

#### fs.readdirSync(path[, options]);  
> 同步的 readdir(3). 返回一个不包括 '.' 和 '..' 的文件名的数组。

#### fs.statSync(path); 
> 返回一个fs.Stats实例
> stats.isDirectory()  如果是目录返回true

#### fs.readFileSync(path[, options], callback); 
> 读取文件的全部内容
> path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。

#### fs.appendFileSync(file, data[, options], callback);
> 追加数据到一个文件，如果文件不存在则创建文件。 data 可以是一个字符串或 buffer。