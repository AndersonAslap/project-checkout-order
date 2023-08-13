import axios from 'axios'

axios.defaults.validateStatus = function() {
  return true;
}

test('Deve trazer a simulação do frete', async function () {
  const input = {
    items: [
      { density:1, volume:1, quantity: 1 },
    ],
    from: "1000",
    to: "1000"
  }
  const response = await axios.post('http://localhost:3002/simulate-freight', input)
  const output = response.data
  expect(output.freight).toBe(10)
})