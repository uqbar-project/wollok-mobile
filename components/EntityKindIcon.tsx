import { Kind } from "wollok-ts/dist/model";
import React from 'react'
import { Image } from "react-native";

export function KindIcon(props: {kind: Kind}){
    return(
        <Image source={getImageFromType(props.kind)} style={{alignSelf:'center'}}/>
    )
}

function getImageFromType(aKind: Kind) {
    switch (aKind) {
        case "Class":
            return require('../assets/class.png')
        case "Singleton":
            return require('../assets/wko.png')
        case "Mixin":
            return require('../assets/mixin.png')
    }
}