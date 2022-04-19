/*
  Initialize all men and women to free
  while there exist a free man m who still has a woman w to propose to
  {
      w = m's highest ranked such woman to whom he has not yet proposed
      if w is free
         (m, w) become engaged
      else some pair (m', w) already exists
         if w prefers m to m'
            (m, w) become engaged
             m' becomes free
         else
            (m', w) remain engaged
  }
*/

// This allows the ranking to figure out the order and the order to figure out the ranking
const males = {
  // Position: ranking
  // Value: user index
  ranking: [
    [0, 1, 2, 3],
    [1, 2, 0, 3],
    [3, 0, 1, 2],
    [2, 3, 0, 1],
  ],
  // Position: user index
  // Value: ranking
  order: [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [1, 2, 3, 0],
    [2, 3, 0, 1],
  ],
  currentIndices: [0, 0, 0, 0],
  pairings: [-1, -1, -1, -1],
}

const females = {
  // Position: ranking
  // Value: user index
  ranking: [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 1, 2, 3],
    [2, 0, 3, 1],
  ],
  // Position: user index
  // Value: ranking
  order: [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 1, 2, 3],
    [1, 3, 0, 2],
  ],
  currentIndices: [0, 0, 0, 0],
  pairings: [-1, -1, -1, -1],
}

const remainingMales = [0, 1, 2, 3]

while (remainingMales.length > 0) {
  const currentMale = remainingMales.shift()
  const currentFemale = males.ranking[currentMale][males.currentIndices[currentMale]]
  const currentPairing = females.pairings[currentFemale]
  if (currentPairing === -1) {
    males.pairings[currentMale] = currentFemale
    females.pairings[currentFemale] = currentMale
  } else {
    const currentOrder = females.order[currentFemale]
    if (currentOrder[currentPairing] < currentOrder[currentMale]) {
      // get the male from the current pairing - un pair them and add them and add them to the remaining males list.
      males.pairings[currentPairing] = -1
      females.pairings[currentFemale] = currentMale
      remainingMales.push(currentPairing)
    }
  }
  males.currentIndices[currentMale]++
}

const pairs = males.pairings.map((female, i) => [i, female])
console.log('_PAIRS_', pairs)

// Validate algorithm
const valid = females.pairings.some((male, i) => {
  const ranking = females.order[i][male]
  // The previous rankings to select from
  for (let j = 0; j < ranking; j++) {
    const currentMan = females.order[i][j]
    const malePairing = males.pairings[currentMan]
    const maleRanking = males.order[malePairing]
    const currentRanking = males.order[i]
    if (maleRanking < currentRanking) {
      return false
    }
  }
  return true
})

console.log('_VALID_', valid)
