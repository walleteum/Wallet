/**
 * @version 0.50
 */
import { createSelector } from 'reselect'

export const getWalletDappData = createSelector(
    [state => state.walletDappStore],
    (data => {
        return {
            dappCode: data.dappCode,
            dappName : data.dappName,
            dappUrl : data.dappUrl,
            incognito : data.incognito,
            walletConnectLink : data.walletConnectLink
        }
    })
)
