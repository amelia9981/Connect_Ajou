import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';

export default class CommunityCard extends Component {
    render() {
        const { writing } = this.props.data; // 피드 항목 데이터
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>name</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Text style={{ fontWeight: '900' }}>{writing.title}</Text>
                </CardItem>
                <CardItem>
                    <Text>{writing.content}</Text>
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon name='ios-heart' style={{ color: 'black', marginRight: 5 }} />
                            <Text>count</Text>
                        </Button>
                        <Button transparent>
                            <Icon name='ios-chatbubbles' style={{ color: 'black', marginRight: 5 }} />
                            <Text>count</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}