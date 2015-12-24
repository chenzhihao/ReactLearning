import es6_promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

es6_promise.polyfill();

const tokenEntry = '//localhost:8888/token';

function Fetch() {
    console.log('fetch initialize');
    this.token = undefined;
}

Fetch.prototype.fetch = function (resourceEntry, options) {
    if (!this.token) {
        return fetch(tokenEntry, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                userName: 'zhihao',
                password: '12345'
            })
        }).then((res)=> {
            return res.json();
        }).then((res)=> {
            this.token = res.token;
            return fetch(resourceEntry, _.merge(
                {
                    headers: {
                        'x-access-token': res.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }, options
            )).then((res)=> {
                return res.json();
            });
        });
    } else {
        return fetch(resourceEntry, _.merge(
            {
                headers: {
                    'x-access-token': this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }, options
        )).then((res)=> {
            return res.json();
        });
    }
};

const FetchInstance = new Fetch();

export default FetchInstance.fetch.bind(FetchInstance);