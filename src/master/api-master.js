
import TokenConfig from '../config/token-config'

export default {
    POST: "POST",
    API_HEADERS_WITHOUT_TOKEN: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    },
    API_HEADERS_WITH_TOKEN: {
        "Authorization": '',
        "Content-type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    },
    API_BODY: {
        headerData: {},
        requestRecord: {}
    },
    TOKEN_HEADERS: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    TOKEN_BODY: {
        grant_type: TokenConfig.grant_type,
        client_id: TokenConfig.client_id,
        client_secret: TokenConfig.client_secret
    },

}