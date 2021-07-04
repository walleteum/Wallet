/**
 * @version 0.45
 */
import store from '@app/store'
import MarketingEvent from '@app/services/Marketing/MarketingEvent'
import config from '@app/config/config'
import { StreamSupportWrapper } from '@app/appstores/Stores/StreamSupport/StreamSupportWrapper'

const { dispatch } = store

export namespace StreamSupportActions {

    export const setData = async function(data: any) {
        return false
        try {
            const oldData = store.getState().streamSupportStore

            if (oldData.userId === data.userId && oldData.userToken === data.userToken && oldData.userName === data.userName) {
                return false
            }

            if (MarketingEvent.DATA.LOG_TOKEN && oldData.userId !== data.userId) {
                StreamSupportWrapper.init(data)
            }

            dispatch({
                type: 'SET_STREAM_SUPPORT_DATA',
                userId: data.userId,
                userToken: data.userToken,
                userName: data.userName,
                loginTime: data.loginTime,
                serverUrl: data.serverUrl,
                loaded: false
            })
        } catch (e) {
            if (config.debug.appErrors) {
                console.log(new Date().toISOString() + ' StreamSupportActions setData error ' + e.message)
            }
        }
    }

    export const allMessages = async function (tmps : any) {
        try {
            const messages = []
            for (const tmp of tmps) {
                const message = {
                    _id: tmp._id,
                    text: tmp.msg,
                    createdAt: tmp.ts['$date'],
                    user: {
                        _id: tmp.u._id,
                        name: tmp.u.username
                    }
                }
                messages.push(message)
            }
            dispatch({
                type: 'SET_STREAM_SUPPORT_LOADED',
                loaded: true,
                messages,
            })
        } catch (e) {
            if (config.debug.appErrors) {
                console.log(new Date().toISOString() + '  StreamSupportActions allMessages error ' + e.message)
            }
        }
    }

    export const addMessage = async function (tmp : any) {
        try {
            const message = {
                _id: tmp._id,
                text: tmp.msg,
                createdAt: tmp.ts['$date'],
                user: {
                    _id: tmp.u._id,
                    name: tmp.u.username
                }
            }
            const oldData = store.getState().streamSupportStore
            const messages = [message]
            for (const tmp of oldData.messages) {
                messages.push(tmp)
            }
            dispatch({
                type: 'SET_STREAM_SUPPORT_LOADED',
                loaded: true,
                messages,
            })
        } catch (e) {
            if (config.debug.appErrors) {
                console.log(new Date().toISOString() + '  StreamSupportActions addMessage error ' + e.message)
            }
        }
    }

    export const setRoom = async function(roomId: any) {
        dispatch({
            type: 'SET_STREAM_SUPPORT_LOADED',
            loaded: true,
            messages: [],
            roomId
        })
    }
}