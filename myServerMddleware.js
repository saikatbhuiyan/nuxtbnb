export default (req, res, next) => {
  if (req.url == "/oldpage") {
    console.log(req.url);
    res.statusCode = 302;
    res.setHeader("location", "/newpage");
    res.end();
    return;
  }
  next();
};
