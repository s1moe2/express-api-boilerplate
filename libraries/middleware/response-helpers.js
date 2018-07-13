module.exports = (req, res, next) => {
  res.apiSuccessJson = (data) => {
    data = data || {};
    data.success = true;
    return data;
  };

  res.apiSuccess = (data) => {
    res.status(200).json(res.apiSuccessJson(data));
  };

  res.apiUserFailJson = (err, fields = undefined) => {
    let stackTrace = (req.app.get('env') === 'development' || req.app.get('env') === 'test') ? err.stack : undefined;

    return {
      success: false,
      error: err.message,
      userError: true,
      errorFields: fields,
      errorCode: err.errorCode,
      stack: stackTrace
    };
  };

  res.apiUserFail = (err, fields = undefined) => {
    res.status(400).json(res.apiUserFailJson(err, fields));
  };

  res.apiAuthenticationFailJson = (err) => {
    return {
      success: false,
      errorCode: err.errorCode,
      userError: true
    };
  };

  res.apiAuthenticationFail = (err) => {
    res.status(401).json(res.apiAuthenticationFailJson(err));
  };

  res.apiSystemFailJson = (err) => {
    let stackTrace = (req.app.get('env') === 'development' || req.app.get('env') === 'test') ? err.stack : undefined;
    return {
      success: false,
      error: err.message,
      userError: false,
      stack: stackTrace
    };
  };

  res.apiSystemFail = (err) => {
    res.status(500).json(res.apiSystemFailJson(err));
  };

  res.unknownApiJson = (message) => {
    return {
      success: false,
      error: message,
      userError: true
    };
  };

  res.unknownApi = (message) => {
    res.status(400).json(res.unknownApiJson(message));
  };

  next();
};