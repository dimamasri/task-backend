import { DownloadResponse, MessageResponse, HtmlResponse } from "../../helpers/api-response.js";
import { BadRequest, FormError, NotFound, ServerError } from "../../helpers/errors.js";

const handler =
    (F) => async (req, res) => {
        try {
            const result = await F(req, res);
            if (result instanceof MessageResponse) {
                return res.json({
                    message: result.message
                });

            } else if (result instanceof HtmlResponse) {
                return res.send(result.html);
            } else if (result instanceof DownloadResponse) {
                return res.download(result.path);
            } else {
                return res.json(result);
            }
        } catch (error) {
            if (
                error instanceof NotFound ||
                error instanceof ServerError ||
                error instanceof BadRequest
            ) {
                return res.status(error.code).json({error: {
                    message: error.message,
                    debug: error.debug,
                    code: error.debugCode,
                }});
            } else if (error instanceof FormError) {
                return res.status(400).json({
                    status: "form-error",
                    error: error.errors,
                });
            } else {
                console.log(error);
                return res.status(500).json({error: {
                    message: "Something went wrong.",
                    debug: "Server Error",
                    code: 500,
                }});
            }
        }
    };

export default handler;
