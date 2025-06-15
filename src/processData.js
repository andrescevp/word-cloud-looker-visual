/**
 * Processes the input data for the Component visualization.
 * @param {*} data - The input data to process.
 * @returns {*} - The processed data.
 */
export const processData = (data) => {
  const rows = data.tables.DEFAULT || [];
  const words = rows.map(row => {
    const text = Array.isArray(row.text) ? row.text[0] : '';
    const weight = row.weight && Array.isArray(row.weight) ? Number(row.weight[0]) : 1;
    return { text, weight };
  });
  return words;
}