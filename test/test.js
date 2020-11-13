/*
    This file is part of ERC725.js.
    ERC725.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    ERC725.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file test/test.js
 * @author Robert McLeod <@robertdavid010>, Fabian Vogelsteller <fabian@lukso.network>
 * @date 2020
 */

// Tests for the ERC725.js package
import assert from 'assert'
import ERC725, { utils } from '../src/index.js'
import { mockSchema } from './mockSchema.js'
import Web3Utils from 'web3-utils'

const address = "0x0c03fba782b07bcf810deb3b7f0595024a444f4e"

class HttpProvider {
  constructor(props) {
    // Deconstruct to create local copy of array
    this.returnData = Array.isArray(props.returnData) ? [...props.returnData] : props.returnData
  }
  send(payload, cb) {
    setTimeout(() => {
      return cb(null, {
        result: (Array.isArray(this.returnData)) ? this.returnData.shift() : this.returnData
      })
    }, 100);
  }
}

class EthereumProvider {
  constructor(props) {
    this.returnData = Array.isArray(props.returnData) ? [...props.returnData] : props.returnData
  }
  request() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = (Array.isArray(this.returnData)) ? this.returnData.shift() : this.returnData
        // TODO: Handle reject
        resolve(result)
      }, 100);
    })
  }
}

class ApolloClient {
  constructor(props) {
    // mock data
    this.returnData = Array.isArray(props.returnData) ? [...props.returnData] : props.returnData
    this.returnKey = props.returnKey
    this.getAll = (props.getAll)
  }
  query(props) {
    // const fieldKey = props.query.definitions[0].selectionSet.selections[0].arguments[0].value.fields[1].value // this gives the field key in query
    // const schema = mockSchema.find(e => { return e.key === fieldKey.value})
    // const data = mockData.find(e => { return e.key === schema.key })

    const val = (Array.isArray(this.returnData) && !this.getAll) ? this.returnData.shift() : this.returnData
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // this.getAll flag is used to return different expected query results
        const res = this.getAll ? {data:{mockResults: this.returnData}} : {data:{mockResults:[{key:this.returnKey ,value:val}]}}
        resolve(res)
      }, 100);
    })
  }
}

describe('erc725.js', function() {

    describe('Getting single data by provider and schema type', function() {
        mockSchema.forEach(schemaElement => {

            it('with web3.currentProvider', async () => {
                const provider = new HttpProvider({returnData:schemaElement.returnRawData})
                const erc725 = new ERC725(mockSchema, address, provider)
                const result = await erc725.getData(schemaElement.key)
                assert.deepStrictEqual(result, schemaElement.expectedResult)
            })

            it('with ethereumProvider EIP 1193', async () => {
                const provider = new EthereumProvider({returnData:schemaElement.returnRawData})
                const erc725 = new ERC725(mockSchema, address, provider)
                const result = await erc725.getData(schemaElement.key)
                assert.deepStrictEqual(result, schemaElement.expectedResult)
            })

            it('with apollo graph provider', async () => {
                const provider = new ApolloClient({returnKey:schemaElement.key, returnData: schemaElement.returnGraphData})
                const erc725 = new ERC725(mockSchema, address, provider)
                const result = await erc725.getData(schemaElement.key)
                assert.deepStrictEqual(result, schemaElement.expectedResult)
            })

        })
        
    })

    describe('Getting all data by provider', function() {
        // Construct the full return object....
        const fullResults = mockSchema.map(e => {
          const obj = {}
          obj[e.name] = e.expectedResult
          return obj
        })

        // Construct simluated raw data result
        const allRawData = []
        const allGraphData = []
        for (let index = 0; index < mockSchema.length; index++) {
          const element = mockSchema[index];
          // if is array push data
          if (element.keyType === 'Array') {
            element.returnRawData.forEach(e => {
              allRawData.push(e)
            })
            element.returnGraphData.forEach(e => {
              // push as objects to simulate graph query result
              allGraphData.push({key:element.key ,value:e})
            })
          } else {
            allRawData.push(element.returnRawData)
            allGraphData.push({key:element.key ,value:element.returnGraphData})
          }
          
        }
        console.log("DONT WE HAVE FULL DATA????")
        console.log(allGraphData)

        it('with web3.currentProvider', async () => {
            const provider = new HttpProvider({returnData:allRawData})
            const erc725 = new ERC725(mockSchema, address, provider)
            const result = await erc725.getAllData()
            assert.deepStrictEqual(result, fullResults)
        })
        it('with ethereumProvider EIP 1193', async () => {
            const provider = new EthereumProvider({returnData:allRawData})
            const erc725 = new ERC725(mockSchema, address, provider)
            const result = await erc725.getAllData()
            assert.deepStrictEqual(result, fullResults)
        })
        it('with apollo client', async () => {
            const provider = new ApolloClient({returnKey:'test', returnData: allGraphData, getAll:true})
            const erc725 = new ERC725(mockSchema, address, provider)
            const result = await erc725.getAllData()
            assert.deepStrictEqual(result, fullResults)
        })
      
    })

    describe('Testing all data utility functions', function() {

        it('decode all data', async () => {
          const fullResults = mockSchema.map(e => {
            const obj = {}
            obj[e.name] = e.expectedResult
            return obj
          })

          // Construct simluated raw bytes decoded blockchain data
          const allGraphData = []
          for (let index = 0; index < mockSchema.length; index++) {
            const element = mockSchema[index];

            // if is a 'nested' array, need to flatten it, and add {key,value} elements
            if (element.keyType === 'Array') {
              element.returnGraphData.forEach((e,i,a) => {

                if (i > 0) {
                  // This is array length key/value pair
                  allGraphData.push({ key: element.key, value: e })
                } else {
                  // We need the new key, and to 'flatten the array as per expected from chain data
                  const newElementKey = element.key.substr(34) + Web3Utils.leftPad(Web3Utils.numberToHex(index + 1), 32)
                  allGraphData.push({key: newElementKey, value: e})
                }
              }) // end .forEach()

            } else {
              allGraphData.push({ key: element.key, value: element.returnGraphData })
            }

          }

          const result = utils.decodeAllData(mockSchema, allGraphData)
          assert.deepStrictEqual(result, fullResults)
        })


        // it('decode data', async () => {
        // })
    })

    describe('Testing encode/decode single key/value utility functions', function() {
    
        /* **************************************** */
        /* Testing encoding/decoding field by field */
        for (let index = 0; index < mockSchema.length; index++) {

            const schemaElement = mockSchema[index]
            if (schemaElement.keyType.toLowerCase() === "array") {

              
            } else {

                it('encode data value', async () => {
                    const result = utils.encodeKeyValue(schemaElement, schemaElement.expectedResult)
                    assert.deepStrictEqual(result, schemaElement.returnGraphData)
                })

                it('decode data value', async () => {
                    const result = utils.decodeKeyValue(schemaElement, schemaElement.returnGraphData)

                    if (typeof result === 'object' && Object.keys(result).length > 0) {

                      const newResult = {}
                      for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                          const element = result[key];
                          newResult[key] = element
                        }
                      }

                      assert.deepStrictEqual(newResult, schemaElement.expectedResult)
                    } else {

                      assert.deepStrictEqual(result, schemaElement.expectedResult)
                    }
                })


            }
          
        }

      })
})

