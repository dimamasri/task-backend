const ReturnResponse = (response, req, res, next) => {
    let json = {
      message: response.message,
    };
  
    if (response.debug) json.debug = response.debug;
    if (response.code) json.code = response.code;
  
    return res.status(response.status ? response.status : 500).json(json);
  };
  
export default ReturnResponse;
  