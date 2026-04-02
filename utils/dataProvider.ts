import fs from 'fs';
import { parse } from 'csv-parse/sync';


export class DataProvider{

    static getTestDataFromJson(filePath:string){
        let data:any= JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    }

    static getTestDataFromCSV(filePath:string){
       const content = fs.readFileSync(filePath, 'utf-8');
       const records = parse(content, {
           columns: true,
           skip_empty_lines: true,
       });
       return records as any[];
    }


}