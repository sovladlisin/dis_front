import { useEffect, useState } from "react"
import { MarkerType } from "reactflow"
import { TAlert } from "./actions/alerts/types"
import { TArc, TNode, TNodeData, TNodeFile, TPattern, TPatternNode } from "./actions/graph/types"
import { TSettings } from "./actions/settings/types"
// import { TClass, TConnectedVisualItem, TObjectExtended } from "./actions/ontology/classes/types"
export const HOST = window.location.host.includes('local') ? "http://" + window.location.host + '/' : "https://" + window.location.host + '/'

// export const SERVER_URL = 'https://infra.iis.nsk.su/neo_graph_server/'
export const SERVER_URL = 'http://127.0.0.1:8000/'
export const SERVER_URL_FILES = 'http://127.0.0.1:8000'
// export const SERVER_URL_FILES = 'https://infra.iis.nsk.su/neo_graph_server'



export const CLASS = "http://www.w3.org/2002/07/owl#Class"
export const OBJECT = "http://www.w3.org/2002/07/owl#NamedIndividual"
export const SUB_CLASS = "http://www.w3.org/2000/01/rdf-schema#subClassOf"
export const HAS_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"


export const PROPERTY_DOMAIN = "http://www.w3.org/2000/01/rdf-schema#domain"
export const PROPERTY_RANGE = "http://www.w3.org/2000/01/rdf-schema#range"
export const DATATYPE_PROPERTY = "http://www.w3.org/2002/07/owl#DatatypeProperty"
export const OBJECT_PROPERTY = "http://www.w3.org/2002/07/owl#ObjectProperty"

export const LABEL = "http://www.w3.org/2000/01/rdf-schema#label"
export const COMMENT = "http://www.w3.org/2000/01/rdf-schema#comment"
export const URI = 'uri'

export const MAIN_RESOURCE = 'http://erlangen-crm.org/mainResource'



export type TDataType = { type: string, name: string, uri: string }
export const DATA_TYPES: TDataType[] = [
    {
        type: 'string',
        name: 'Cтрока',
        uri: 'http://www.w3.org/2000/01/rdf-schema#Literal'
    },
    {
        type: 'langString',
        name: 'Языковая строка',
        uri: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'
    },
]

export const makeId = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


export const renderEntityMedia = (f: TNode) => {
    var local_file: TNodeFile = null
    local_file = f.data.file ? f.data.file : f.data.connected_file
    if (local_file === null) return <></>;

    switch (local_file.resource_type) {
        case 'jpeg' || 'png' || 'webp' || 'jpg':
            return <img src={'data:image/' + 'PNG' + ';base64,' + local_file.file_object} />
        case 'txt':
            return null
            return <i className='fas fa-circle-notch color-blue'></i>
            return 'data:image/' + 'PNG' + ';base64,' + local_file.file_object
        default:
            return null
    }
}

export const checkEntityMedia = (f: TNode) => {
    var local_file: TNodeFile = null
    local_file = f.data.file ? f.data.file : f.data.connected_file
    if (local_file === null) return false;
    if (local_file.resource_type === 'txt') return false;
    if (local_file.resource_type === 'mp4') return false;
    if (local_file.resource_type === 'avi') return false;
    if (local_file.resource_type === 'pdf') return false;
    return true
}

// export const getImage = (node: TObjectExtended): string => {
//     if (node === null) return ACCOUNT_1
//     if (node.resources.length > 0) {
//         const found = node.resources.filter(r => ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type))
//         if (found.length > 0) return SERVER_DOMAIN.slice(0, -1) + found.pop().file.source
//     }
//     return ACCOUNT_1
// }
// export const getNote = (node: TClass): string => {
//     if (node[NOTE_URI]) return node[NOTE_URI]
//     return 'Описание отсутствует...'
// }
// export const getImageFile = (node: TObjectExtended): TConnectedVisualItem => {
//     if (node.resources.length > 0) {
//         const found = node.resources.filter(r => ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type))
//         if (found.length > 0) return found.pop()
//     }
//     return null
// }

// export const removeDuplFromNodeList = (list: TClass[]) => {

//     var l = {}
//     list.filter(i => i).map(i => {
//         l[i.id] = i
//     })
//     return Object.keys(l).map(i => l[i])

// }

// // export const getActorName = (node: TClass, short = false) => {
// //     if (short) return node[INITIALS] + ' ' + node[LAST_NAME]
// //     return node[INITIALS] + ' ' + node[LAST_NAME] + ' ' + node[FIRST_NAME] + ' ' + node[MID_NAME]
// // }

export const calcNodeWidthForLayout = (node: TNode) => {
    const letters = getNodeLabel(node).length
    return (7.5 * letters) + 40
}
export const getNodeColorClass = (node: TNode) => {
    if (node.data.labels.includes(CLASS))
        return 'node-class'
    if (node.data.labels.includes(OBJECT))
        return 'node-object'
    if (node.data.labels.includes(OBJECT_PROPERTY) || node.data.labels.includes(DATATYPE_PROPERTY))
        return 'node-service'
}
export const getNodeColor = (node: TNode) => {
    if (!node) return ''
    if (node.data.labels.includes(CLASS))
        return '#5f9dff'
    if (node.data.labels.includes(OBJECT))
        return '#ff7171'
    if (node.data.labels.includes(OBJECT_PROPERTY) || node.data.labels.includes(DATATYPE_PROPERTY))
        return '#e7b43c'
}

export const getPatternNodeColorClass = (node: TPatternNode) => {
    if (!node) return ''
    if (node.data.tag === CLASS)
        return 'node-class'
    if (node.data.tag === OBJECT)
        return 'node-object'
    if ([OBJECT_PROPERTY, DATATYPE_PROPERTY].includes(node.data.tag))
        return 'node-service'
}

export const getArcLabel = (arc_data: TNodeData, settings?: TSettings) => {
    if (arc_data === null) return 'arror-null'

    const arc_label = arc_data.uri
    if (arc_label.includes('#'))
        return arc_label.split('#').pop()
    if (arc_label.includes('/'))
        return arc_label.split('/').pop()
    return 'arc-name-error'

}

export const MAIN_MARKER = {
    type: MarkerType.Arrow, // 'arrow' or 'arrowclosed'
    color: 'black', // arrow fill color
    width: 15,
    height: 15,
    // markerUnits?: string; // defines the coordinate system https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/markerUnits
    // orient?: string; // defines rotation - 'auto' | 'auto-start-reverse' | number
    strokeWidth: 2
}

export const checkPattern = (pattern: TPattern,) => {
    const pattern_main = pattern.nodes.find(n => n.data.is_main)
    if (!pattern_main) return;
    const collect = (node: TPatternNode) => {

    }

    const get_node = (id: string) => {
        return pattern.nodes.find(n => n.id === id)
    }

    const transform_labels = (labels: string[]) => {
        if (labels.length === 0)
            return '``'
        var res = ''

        labels.map(l => {
            res += '`' + l + '`:'
        })
        return res.slice(0, -1)
    }


    var q_f = ''
    var q_b = ''
    var node_q = ' (node: ' + transform_labels([pattern_main.data.tag]) + ') '

    pattern.arcs.filter(p_a => p_a.source === pattern_main.id).filter(p_a => get_node(p_a.target).data.is_const_filter).map(p_a => {
        const p_a_uri = p_a.label
        const v_node = get_node(p_a.target)
        const v_label = v_node.data.tag
        const v_uri = v_node.data.is_const_node ? v_node.data.is_const_node.data.uri : ''
        var v = '(v:`' + v_label + '`)'
        if (v_uri.length)
            v = '(v:`' + v_label + '` {uri: "' + v_uri + '"})'


        q_f = '- [: `' + p_a_uri + '`] -> ' + v
    })

    return 'match ' + node_q + q_f + ' return node'

}

export const checkPatternOnSelectNode = (node: TPatternNode, pattern: TPattern) => {

    const collect = (node: TPatternNode) => {

    }

    const get_node = (id: string) => {
        return pattern.nodes.find(n => n.id === id)
    }

    var q_f = ''
    var q_b = ''
    var node_q = ' (node: `' + node.data.tag + '`) '

    pattern.arcs.filter(p_a => p_a.source === node.id).filter(p_a => get_node(p_a.target).data.is_const_filter).map(p_a => {
        const p_a_uri = p_a.label
        const v_node = get_node(p_a.target)
        const v_label = v_node.data.tag
        const v_uri = v_node.data.is_const_node ? v_node.data.is_const_node.data.uri : ''
        var v = '(v:`' + v_label + '`)'
        if (v_uri.length)
            v = '(v:`' + v_label + '` {uri: "' + v_uri + '"})'


        q_f = '- [: `' + p_a_uri + '`] -> ' + v
    })
    console.log('match ' + node_q + q_f + ' return node')
    return 'match ' + node_q + q_f + ' return node'

}

export const readLabel = (label: string[], settings?: TSettings) => {
    const language = settings ? settings.lang : 'ru'
    var result = ''
    label.map(s => {
        if (s.includes(language))
            result = s.split('@')[0]
    })
    if (result.length === 0) return 'read-label-error'
    return result
}

export const getNodeLabel = (node: TNode, settings?: TSettings) => {

    // @ts-ignore
    if (node === []) return 'error-array'
    if (node === null) return 'Не указано'
    if (node === undefined) return 'Не указано'

    if (!node.data.labels) return 'error-no-labels'

    const language = settings ? settings.lang : 'ru'

    const params = node.data.params
    if (!params.includes(LABEL)) {
        if (node.data['uri']) {
            if (node.data['uri'].includes('#')) return node.data['uri'].split('#').pop()
            if (node.data['uri'].includes('/')) return node.data['uri'].split('/').pop()
        }
        return 'error-with-uri'
    }
    if (!Array.isArray(node.data[LABEL])) {
        return 'error-in-label-type'
    }
    const label: String[] = node.data[LABEL]
    var result = ''
    label.map(s => {
        if (s.includes(language))
            result = s.split('@')[0]
    })
    if (result.length === 0) return label[0].split('@')[0]
    return result
}
export const getRandomInt = (min = 0, max = 100000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const removeDuplFromStringList = (a: string[]) => {
    var t = {}
    a.map(i => {
        t[i] = 1
    })
    return Object.keys(t)
}

export const encode = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
}

export const decode = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
}

export const useKeyPress = (targetKey) => {

    // State for keeping track of whether key is pressed

    const [keyPressed, setKeyPressed] = useState(false);



    // If pressed key is our target key then set to true

    function downHandler({ key }) {
        // console.log(key)

        if (key === targetKey) {
            setKeyPressed(true);

        }

    }



    // If released key is our target key then set to false

    const upHandler = ({ key }) => {

        if (key === targetKey) {

            setKeyPressed(false);

        }

    };



    // Add event listeners

    useEffect(() => {

        window.addEventListener('keydown', downHandler);

        window.addEventListener('keyup', upHandler);

        // Remove event listeners on cleanup

        return () => {

            window.removeEventListener('keydown', downHandler);

            window.removeEventListener('keyup', upHandler);

        };

    }, []); // Empty array ensures that effect is only run on mount and unmount



    return keyPressed;

}

export const nodeFilter = (subString: string, node) => {
    const search = subString.toLowerCase()
    const checkArray = (subString: string, array) => {
        return array.find(el => {
            const val: string = el + ""
            if (val.toLowerCase().includes(subString)) return true
            return false
        })
    }

    if (!node) return false;
    const params = Object.keys(node)
    return params.find(param => {
        const value = node[param]
        if (Array.isArray(value)) return checkArray(search, value)
        if (typeof value === 'object') return nodeFilter(search, value)
        const val = value + ""
        if (val.toLowerCase().includes(search)) return true
        return false
    })
}

export const handleError = (err): TAlert => {
    var message = ''
    if (err.response) {
        switch (err.response.status) {
            case 401:
                message = 'Ошибка авторизации. Пожалуйста, войдите в систему'
                break;

            case 500:
                message = 'Ошибка сервера, обновите страницу и попробуйте операцию снова'
                break;

            default:
                message = err.response.data.detail
                break;
        }
    }
    return { type: err.response.status, message }
}


export const useOnClickOutside = (ref, handler) => {
    useEffect(
        () => {
            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}