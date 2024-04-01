/**
 * Retorna o ID do CustomerSuccess com o maior número de clientes
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 * @returns {number}
 */

function customerSuccessBalancing(customerSuccess, customers, customerSuccessAway) {
  
  const availableCS = customerSuccess.filter(cs => !customerSuccessAway.includes(cs.id));
  const csMap = new Map();
  availableCS.forEach(cs => csMap.set(cs.id, cs.score));
  availableCS.sort((a, b) => a.score - b.score);
  customers.sort((a, b) => a.score - b.score);
  const customersServed = new Map();
  availableCS.forEach(cs => customersServed.set(cs.id, 0));
  let csIndex = 0;

  for (const customer of customers) {
    while (csIndex < availableCS.length && customer.score > availableCS[csIndex].score) {
      csIndex++;
    }
    if (csIndex === availableCS.length) {
      break;
    }
    customersServed.set(availableCS[csIndex].id, customersServed.get(availableCS[csIndex].id) + 1);
  }
  
  let maxClients = -1;
  let bestCSId = 0;
  
  customersServed.forEach((clients, csId) => {
    if (clients > maxClients) {
      maxClients = clients;
      bestCSId = csId;
    } else if (clients === maxClients) {
      bestCSId = 0;
    }
  });
  
  return bestCSId;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.from({ length: count }, (_, i) => i + startAt);
}

function buildSizeEntities(size, score) {
  return Array.from({ length: size }, (_, i) => ({ id: i + 1, score }));
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});
