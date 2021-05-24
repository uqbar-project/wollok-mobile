import { Kind } from "wollok-ts/dist/model"
import React  from "react"
import { ToggleButton, Text } from "react-native-paper"
import { View  } from "react-native"
import { stylesheet } from "./styles"


export function SelectKind(props: { kind: Kind, setKind: (value: Kind) => void }) {


    function toggleButtonColorByKind(aKind: Kind) {
        return props.kind == aKind ? 'grey' : undefined
    }

    return (
        <ToggleButton.Row style={stylesheet.toggleButtonRow}
            onValueChange={(value) => props.setKind(value as Kind)}
            value={props.kind}>
            {entityKinds.map(aKind => {
                return (
                    <ToggleButton
                        key={aKind.kind}
                        style={[ 
                            stylesheet.toggleButton,
                            { backgroundColor: toggleButtonColorByKind(aKind.kind) } 
                        ]}
                        icon={() => <View><Text>{aKind.description}</Text></View>}
                        value={aKind.kind}
                    />
                )
            })}
        </ToggleButton.Row>
    )
}


const entityKinds: { kind: Kind, description: string }[] =
    [
        { kind: 'Singleton', description: 'OBJETO' },
        { kind: 'Class', description: 'CLASE' },
        { kind: 'Mixin', description: 'MIXIN' }
    ]