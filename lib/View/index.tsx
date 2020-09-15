import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface IProps {}

interface IState {}

class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>Index</Text>
      </View>
    )
  }
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
