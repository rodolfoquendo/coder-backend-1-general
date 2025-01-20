import fs from "fs";

export default class FileManager{
    read(path){
        return fs.readFileSync(path);
    }
    write(path,content){
        return fs.writeFileSync(path, content);
    }
}

const manager = new FileManager();
console.log(manager.read('./test.txt'));