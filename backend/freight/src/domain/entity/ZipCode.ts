import { Coord } from "./Coord";

export class ZipCode {

    coord: Coord

    constructor(readonly zipcode: string, lat: number, long: number){
        this.coord = new Coord(lat, long)
    }
}