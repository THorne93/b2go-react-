import React from 'react';
import service from '../service/service';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'antd';

function withParams(Component) {
    return props => {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

class Exercises extends React.Component {
    state = {
        user: this.props.user,
        schools: [],
        loading: true,
    };

    componentDidMount() {
        this.fetchSchools();
    }



    fetchSchools = async () => {
        try {
            const response = await service.get(`/schools`);
            if (response && response.status === 200) {
                const schools = response.data;
                this.setState({ schools, loading: false });
            } else {
                console.error("Failed to fetch schools. Response:", response);
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Error fetching schools:", error);
            this.setState({ loading: false });
        }
    };

    render() {
        const { schools, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2>Schools</h2>
                <Row gutter={[16, 16]}>
                    {schools.map((school) => (
                        <Col
                            key={school.id}
                            sm={24}   // 1 card per row on extra small screens (<576px)
                            md={12}   // 2 cards per row on small screens (≥576px)
                            lg={8}    // 3 cards per row on medium screens (≥768px)
                            xl={6}    // 4 cards per row on large screens (≥992px)
                            xxl={4}    // 6 cards per row on extra large screens (≥1200px)
                        >
                            <Card title={school.name} bordered={false}>
                                {school.address}
                                {school.email}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default withParams(Exercises);
