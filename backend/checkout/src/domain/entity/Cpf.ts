export class Cpf {
    value: string;

    constructor(readonly cpf: string){
        if (!this.validate(cpf)) throw new Error('Invalid cpf')
        this.value = cpf;
    }

    removeCaracterSpecial(cpf: string) {
        return cpf.replace('.', '').replace('.', '').replace('-', '').replace(' ', '')
    }
      
    isValid(cpf: string) {
        return (
          cpf.length >= 11 || cpf.length <= 14 || cpf !== undefined || cpf !== null
        )
    }
      
    isEquals(cpf: string, digitOne: number, digitTwo: number) {
        return (
          cpf.substring(cpf.length - 2, cpf.length) == '' + digitOne + '' + digitTwo
        )
    }
      
    digit(value: number) {
        let rest = value % 11
        return rest < 2 ? 0 : 11 - rest
    }
      
    validate(cpf: string) {
        if (!this.isValid(cpf)) return false
      
        cpf = this.removeCaracterSpecial(cpf)
      
        if (!!cpf.split('').every((c) => c === cpf[0])) return false
      
        try {
          let digitOne = 0
          let digitTwo = 0
      
          for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
            let digito = parseInt(cpf.substring(nCount - 1, nCount))
            digitOne += (11 - nCount) * digito
            digitTwo += (12 - nCount) * digito
          }
      
          digitOne = this.digit(digitOne)
      
          digitTwo += 2 * digitOne
          digitTwo = this.digit(digitTwo)
      
          return this.isEquals(cpf, digitOne, digitTwo)
        } catch (e) {
          return false
        }
    }  
}