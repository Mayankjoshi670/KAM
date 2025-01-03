const conn = require("../config/dbConnection");
const tableSchemas = require("../models/schema");
const seedDemoData = () => {
    // Create tables if not exist
    Object.values(tableSchemas).forEach((schema) => {
        conn.query(schema, (err) => {
            if (err) {
                console.error('Error creating table:', err);
                return;
            }
        });
    });

    // Check if demo data already exists
    conn.query('SELECT COUNT(*) AS count FROM RESTAURANTS', (err, results) => {
        if (err) {
            console.error('Error checking existing data:', err);
            return;
        }

        if (results[0].count > 0) {
            console.log('Demo data already exists.');
            return;
        }

        console.log('Seeding demo data...');

        // Insert data into RESTAURANTS
        conn.query(`
            INSERT INTO RESTAURANTS (ID, NAME, ADDRESS, STATUS, FREQUENCY) VALUES
            (100, 'Golden Spoon', '123 Main St', 'Active', NULL),
            (101, 'Food Fiesta', '456 Oak St', 'Active', NULL),
            (102, 'Spicy Delight', '789 Pine St', 'Inactive', NULL),
            (103, 'Healthy Bites', '321 Elm St', 'Active', NULL),
            (104, 'Urban Eats', '654 Maple St', 'Active', NULL);
        `, (err) => {
            if (err) {
                console.error('Error inserting RESTAURANTS data:', err);
                return;
            }

            // Insert data into ORDERS
            conn.query(`
                INSERT INTO ORDERS (ID, RESTAURANT_ID, ORDER_TIME, AMOUNT) VALUES
                (100, 100, '2024-12-01 12:00:00', 200.50),
                (101, 100, '2024-12-02 15:30:00', 350.75),
                (102, 101, '2024-12-01 14:00:00', 120.00),
                (103, 101, '2024-12-03 16:45:00', 480.00),
                (104, 101, '2024-12-04 18:00:00', 300.00),
                (105, 102, '2024-12-02 10:00:00', 50.00),
                (106, 103, '2024-12-01 08:00:00', 100.00),
                (107, 103, '2024-12-03 10:30:00', 200.00),
                (108, 104, '2024-12-02 20:00:00', 400.00),
                (109, 104, '2024-12-03 21:00:00', 250.00);
            `, (err) => {
                if (err) {
                    console.error('Error inserting ORDERS data:', err);
                    return;
                }

                // Insert data into CONTACTS
                conn.query(`
                    INSERT INTO CONTACTS (ID, NAME, EMAIL, PHONE, RESTAURANT_ID, ROLE) VALUES
                    (100, 'Alice Johnson', 'alice@goldenspoon.com', '1234567890', 100, 'Manager'),
                    (101, 'Bob Smith', 'bob@foodfiesta.com', '2345678901', 101, 'Owner'),
                    (102, 'Charlie Brown', 'charlie@spicydelight.com', '3456789012', 102, 'Chef'),
                    (103, 'Diana Prince', 'diana@healthybites.com', '4567890123', 103, 'Manager'),
                    (104, 'Edward Norton', 'edward@urbaneats.com', '5678901234', 104, 'Owner');
                `, (err) => {
                    if (err) {
                        console.error('Error inserting CONTACTS data:', err);
                        return;
                    }

                    // Insert data into CALLS
                    conn.query(`
                        INSERT INTO CALLS (CONTACT_ID, CALL_TIME, RESTAURANT_ID) VALUES
                        (100, '2024-12-01 09:00:00', 100),
                        (100, '2024-12-02 11:00:00', 100),
                        (101, '2024-12-03 14:30:00', 101),
                        (101, '2024-12-04 16:00:00', 101),
                        (102, '2024-12-01 13:00:00', 102),
                        (103, '2024-12-02 10:00:00', 103),
                        (103, '2024-12-03 11:30:00', 103),
                        (104, '2024-12-02 19:00:00', 104),
                        (104, '2024-12-03 20:30:00', 104),
                        (104, '2024-12-04 21:00:00', 104);
                    `, (err) => {
                        if (err) {
                            console.error('Error inserting CALLS data:', err);
                            return;
                        }

                        console.log('Demo data seeded successfully.');
                    });
                });
            });
        });
    });
};

 

module.exports = seedDemoData;