function renderPage(res, page, data) {
    res.render(page, data, function (err, pageHtml) {
        res.render('layout', {
            body: pageHtml,
            ...data
        });
    });
}


module.exports = { renderPage };