import axios from 'axios'

axios.defaults.validateStatus = function() {
  return true;
}

test('Deve listar os produtos em json', async function () {
  const response = await axios.get('http://localhost:3001/products', {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const output = response.data
  expect(output).toHaveLength(6)
  expect(output.at(0)?.id).toBe(1)
})

test('Deve listar os produtos em csv', async function () {
  const response = await axios.get('http://localhost:3001/products', {
    headers: {
      "Content-Type": "text/csv"
    }
  })
  const output = response.data
  expect(output).toBe("1;product - 1;100\n2;product - 2;100\n3;product - 3;100\n4;product - 4;9\n5;product - 5;9\n6;product - 5;9")
})

test('Deve retornar o produto pelo id', async function () {
  const response = await axios.get('http://localhost:3001/products/1')
  const output = response.data
  expect(output.id).toBe(1)
  expect(output.description).toBe('product - 1')
  expect(output.price).toBe(100)
  expect(output.width).toBe(10)
  expect(output.height).toBe(10)
})
