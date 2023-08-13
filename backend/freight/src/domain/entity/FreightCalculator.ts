export class FreightCalculator {

    static calculate(volume: number, density:number, distance: number) {
        let freight = volume * distance * (density/100)
        return Math.max(10, freight)
    }
}