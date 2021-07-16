import { Kind } from "wollok-ts/dist/model"
import React from "react"
import { ToggleButton, Text } from "react-native-paper"
import { View } from "react-native"
import { stylesheet } from "./styles"
import { translate } from "../../../utils/translation-helpers"

type VisualKind = { kind: Kind, description: string }

export function SelectKind(props: { kind: Kind, setKind: (value: Kind) => void }) {


    function toggleButtonColorByKind(aKind: Kind) {
        return props.kind == aKind ? 'grey' : undefined
    }

    return (
        <ToggleButton.Row style={stylesheet.toggleButtonRow}
            onValueChange={(value) => props.setKind(value as Kind)}
            value={props.kind}>
            {entityKinds.map((aKind: VisualKind) => {
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




function applyTranslation(kind: VisualKind): VisualKind {
    return {
        ...kind,
        description: translate(kind.description, { scope: 'entities.kinds' }).toUpperCase()
    }
}

const entityKinds: VisualKind[] =
    [
        { kind: 'Singleton' as Kind, description: 'object' },
        { kind: 'Class' as Kind, description: 'class' },
        { kind: 'Mixin' as Kind, description: 'mixin' }
    ].map(applyTranslation)

