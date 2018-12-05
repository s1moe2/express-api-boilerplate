const requireRoot = require('app-root-path').require
const { AppException } = requireRoot('/src/util/exceptions')

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : []
  try {
    const result = await promise(...boundParams)
    return res.apiSuccess(result || { message: 'OK' })
  } catch (error) {
    if (error instanceof AppException) {
      return res.apiError(error)
    }

    // return res.apiError(new AppException()) && next(error);
    return next(error)
  }
}

module.exports = {
  controllerHandler
}
