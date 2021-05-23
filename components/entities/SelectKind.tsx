import { Kind } from "wollok-ts/dist/model"
import React  from "react"
import { ToggleButton, Text } from "react-native-paper"
import { View  } from "react-native"


export function SelectKind(props: { kind: Kind, setKind: (value: Kind) => void }) {


    function toggleButtonColorByKind(aKind: Kind) {
        return props.kind == aKind ? 'grey' : undefined
    }

    return (
        <ToggleButton.Row style={{ marginVertical: 15, alignSelf: 'center' }}
            onValueChange={(value) => props.setKind(value as Kind)}
            value={props.kind}>
            {entityKinds.map(aKind => {
                return (
                    <ToggleButton
                        key={aKind.kind}
                        style={{ width: 100, backgroundColor: toggleButtonColorByKind(aKind.kind) }}
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