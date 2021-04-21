import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../../Utilities/Firebase";

class Message extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="layout" size={24} style={{ color: tintColor }} />
    ),
  };

  state = {
    messages: [],
  };

  componentDidMount() {
    Firebase.shared.on((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    Firebase.shared.off();
  }

  get user() {
    return {
      name: "Jeanine Han",
      _id: Firebase.shared.uid,
      avatar: "https://facebook.github.io/react/img/logo_og.png",
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.shared.send}
        user={this.user}
      />
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Message;
