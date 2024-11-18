import React, { useState } from 'react'
import { motion } from 'framer-motion'

function convertNumber(number: string, fromBase: number, toBase: number): string {
  let decimal = 0;
  let position = 0;

  // Převod z původní soustavy do desítkové
  for (let i = number.length - 1; i >= 0; i--) {
    let char = number[i];
    let digit;

    if (char >= '0' && char <= '9') {
      digit = char.charCodeAt(0) - '0'.charCodeAt(0);
    } else if (char >= 'A' && char <= 'Z') {
      digit = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    } else {
      throw new Error("Neplatný znak.");
    }

    if (digit >= fromBase) {
      throw new Error("Cifra mimo rozsah základní soustavy.");
    }

    decimal += digit * Math.pow(fromBase, position);
    position++;
  }

  // Převod z desítkové do cílové soustavy
  let result = '';
  while (decimal > 0) {
    let remainder = decimal % toBase;
    result = (remainder < 10 ? remainder : String.fromCharCode(remainder - 10 + 'A'.charCodeAt(0))) + result;
    decimal = Math.floor(decimal / toBase);
  }

  return result || '0';
}

export default function App() {
  const [number, setNumber] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [toBase, setToBase] = useState('2')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const convertedNumber = convertNumber(number.toUpperCase(), parseInt(fromBase), parseInt(toBase))
      setResult(convertedNumber)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setResult('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full"
      >
        <div className="bg-gray-800 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Převodník čísel</h1>
        </div>
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">Číslo:</label>
              <input 
                type="text" 
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fromBase" className="block text-sm font-medium text-gray-700">Základ soustavy:</label>
                <select 
                  id="fromBase"
                  value={fromBase}
                  onChange={(e) => setFromBase(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md transition-all"
                >
                  <option value="2">2 (Binární)</option>
                  <option value="8">8 (Osmičková)</option>
                  <option value="10">10 (Desítková)</option>
                  <option value="16">16 (Šestnáctková)</option>
                </select>
              </div>

              <div>
                <label htmlFor="toBase" className="block text-sm font-medium text-gray-700">Do základu soustavy:</label>
                <select 
                  id="toBase"
                  value={toBase}
                  onChange={(e) => setToBase(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md transition-all"
                >
                  <option value="2">2 (Binární)</option>
                  <option value="8">8 (Osmičková)</option>
                  <option value="10">10 (Desítková)</option>
                  <option value="16">16 (Šestnáctková)</option>
                </select>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
            >
              Převést
            </motion.button>
          </form>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-md bg-green-100 text-green-800"
            >
              Výsledek: {result}
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-md bg-red-100 text-red-800"
            >
              Chyba: {error}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}