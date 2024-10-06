module.exports = (total, page) => {
  return {
    current_page: page || 1,
    total_items: total,
    total_pages: Math.ceil(total / process.env.RECORDS_PER_PAGE)
  };
};
