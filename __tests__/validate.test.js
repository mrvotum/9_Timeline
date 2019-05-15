import ValidateForm from '../src/js/ValidateForm';

test('correct with space', () => {
  const form = document.querySelector('[data-id=formError]');
  const inputCheckForm = new ValidateForm(form);

  const inputGeopos = '19.09341, -1.83194';

  const expected = true; // ожидает

  const received = inputCheckForm.validateUsername(inputGeopos); // получает
  expect(received).toEqual(expected); // сравнивает
});

test('correct without space', () => {
  const form = document.querySelector('[data-id=formError]');
  const inputCheckForm = new ValidateForm(form);

  const inputGeopos = '-19.09341,1.83194';

  const expected = true; // ожидает

  const received = inputCheckForm.validateUsername(inputGeopos); // получает
  expect(received).toEqual(expected); // сравнивает
});

test('correct with []', () => {
  const form = document.querySelector('[data-id=formError]');
  const inputCheckForm = new ValidateForm(form);

  const inputGeopos = '[19.09341, 1.83194]';

  const expected = true; // ожидает

  const received = inputCheckForm.validateUsername(inputGeopos); // получает
  expect(received).toEqual(expected); // сравнивает
});

test('correct with []', () => {
  const form = document.querySelector('[data-id=formError]');
  const inputCheckForm = new ValidateForm(form);

  const inputGeopos = '[19.09341, 1.83194]';

  const expected = true; // ожидает

  const received = inputCheckForm.validateUsername(inputGeopos); // получает
  expect(received).toEqual(expected); // сравнивает
});
