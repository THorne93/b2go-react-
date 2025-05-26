import React from 'react';
import service from '../service/service';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Input, Spin } from 'antd';

function withParams(Component) {
    return props => {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

class Exercises extends React.Component {
    state = {
        user: this.props.user,
        filteredUsers: [],
        users: [],
        loading: true,
    };

    componentDidMount() {
        this.fetchUsers();
    }



    fetchUsers = async () => {
        try {
            const response = await service.get(`/users`);
            if (response && response.status === 200) {
                const users = response.data;
                this.setState({ users, filteredUsers: users, loading: false });
            } else {
                console.error("Failed to fetch users. Response:", response);
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            this.setState({ loading: false });
        }
    };

    render() {
        const { filteredUsers, loading } = this.state;

        return (<Spin spinning={loading} tip="Loading users...">
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Users</h2>
                    <Input
                        onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            const filteredUsers = this.state.users.filter(user =>
                                user.name.toLowerCase().includes(searchTerm) ||
                                user.surname.toLowerCase().includes(searchTerm) ||
                                user.email.toLowerCase().includes(searchTerm)
                            );
                            this.setState({ filteredUsers });
                        }}
                        type="text"
                        placeholder="Search users..."
                        style={{ width: 300 }}
                    />
                </div>

                <Row gutter={[16, 16]}>
                    {filteredUsers.map((user) => (
                        <Col
                            key={user.id}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={6}
                            xxl={4}
                        >
                            <Card
                                title={`${user.name} ${user.surname}`}
                                bordered
                                hoverable
                                className="custom-card"
                            >
                                {user.email}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Spin>
        );
    }
}

export default withParams(Exercises);
