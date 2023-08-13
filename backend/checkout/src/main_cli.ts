/*
import { Checkout } from './application/usecase/Checkout';
import { validate } from './utils/cpfValidator'
import pgp from 'pg-promise'

type Input = {
    cpf: string,
    items: {idProduct: number, quantity: number}[],
    from?: string,
    to?: string,
    coupon?: string
}

const input : Input = {
    cpf: '',
    items: [],
};

process.stdin.on("data", async function(data) {
    const command = data.toString().replace(/\n/g, '')
    if (command.startsWith("set-cpf")) {
        const cpf = command.replace('set-cpf ', '')
        input.cpf = cpf
        console.log(input)
        return;
    }
    if (command.startsWith("add-item")) {
        const [idProduct, quantity] = command.replace('add-item ', '').split(' ')
        input.items.push({idProduct: parseInt(idProduct), quantity: parseInt(quantity)})
        console.log(input)
        return;
    }
    if (command.startsWith("checkout")) {
        const checkout = new Checkout()
        try {
            const output = await checkout.execute(input) 
            console.log(output)
        } catch(e: any) {
            console.log(e.message)
        }
        return;
    }
    if (command.startsWith("quit")) {
        process.exit()
    }
    console.log("Invalid command")
})*/