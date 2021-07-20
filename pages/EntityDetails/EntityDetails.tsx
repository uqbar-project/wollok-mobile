import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { List } from 'react-native-paper'
import { RootStackParamList } from '../../App'
import AccordionList from '../../components/entity-detail/accordion-list/AccordionList'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'

export default function (props: {
  route: RouteProp<RootStackParamList, 'EntityDetails'>
}) {
  return (
    <MultiFabScreen
      actions={[
        {
          icon: 'database',
          label: 'Atributo',
          onPress: () => console.log('atr'),
        },
        {
          icon: 'code-braces',
          label: 'Metodo',
          onPress: () => console.log('met'),
        },
      ]}>
      <List.Section>
        <AccordionList
          title="ATRIBUTOS"
          items={props.route.params.entity.attributes}
        />
        <AccordionList
          title="METODOS"
          items={props.route.params.entity.methods}
        />
      </List.Section>
    </MultiFabScreen>
  )
}
