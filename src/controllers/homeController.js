const getHomePage = (req, res) => {
    res.render('home', { title: 'Trang chu', day: 'Thứ Năm' });
};

module.exports = {
    getHomePage,
};
