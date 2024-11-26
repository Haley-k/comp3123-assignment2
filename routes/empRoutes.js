const express = require('express');
const Employee = require('../models/empModel');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new employee
router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            created_at: new Date(),
            updated_at: new Date()
        });

        await newEmployee.save();

        res.status(201).json({
            message: 'Employee created successfully',
            employee_id: newEmployee._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update employee by ID
router.put('/employees/:eid', async (req, res) => {
    const updates = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, updates, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee by ID
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;

    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;