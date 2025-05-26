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
        exercises: [],
        loading: true,
    };

    componentDidMount() {
        this.fetchExercises();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.part !== this.props.params.part) {
            this.setState({ loading: true }, () => this.fetchExercises());
        }
    }

    fetchExercises = async () => {
        const { part } = this.props.params;
        try {
            const response = await service.get(`/exercises`, { part });
            if (response && response.status === 200) {
                const exercises = response.data;
                this.setState({ exercises, loading: false });
            } else {
                console.error("Failed to fetch exercises. Response:", response);
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Error fetching exercises:", error);
            this.setState({ loading: false });
        }
    };

    render() {
        const { exercises, loading } = this.state;
        const { part } = this.props.params;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2>Exercises for part {part}</h2>
                <Row gutter={[16, 16]}>
                    {exercises.map((exercise) => (
                        <Col
                            key={exercise.id}
                            sm={24}   // 1 card per row on extra small screens (<576px)
                            md={12}   // 2 cards per row on small screens (≥576px)
                            lg={8}    // 3 cards per row on medium screens (≥768px)
                            xl={6}    // 4 cards per row on large screens (≥992px)
                            xxl={4}    // 6 cards per row on extra large screens (≥1200px)
                        >
                            <Card title={exercise.title} bordered={false}>
                                {/* Card content here */}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default withParams(Exercises);
