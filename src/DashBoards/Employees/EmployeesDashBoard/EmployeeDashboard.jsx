// src/pages/EmployeeDashboard.jsx
import styles from "./EmployeeDashboard.module.css";

import { FiBell, FiMessageCircle } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import useEmployeeDetails from "../useEmployeeDetails";

// sample data (replace with real API)
const pieData = [
  { name: "Present", value: 18 },
  { name: "Absent", value: 5 },
  { name: "Leave", value: 3 },
];

const barData = [
  { name: "Jan", Product: 40, Market: 24, Testing: 20 },
  { name: "Feb", Product: 30, Market: 13, Testing: 22 },
  { name: "Mar", Product: 20, Market: 98, Testing: 39 },
  { name: "Apr", Product: 27, Market: 39, Testing: 20 },
  { name: "May", Product: 18, Market: 48, Testing: 21 },
  { name: "Jun", Product: 23, Market: 38, Testing: 25 },
];

const COLORS = ["#6a63ff", "#5BC0BE", "#FF7A7A"];

export default function EmployeeDashboard() {
  const employeeData = useEmployeeDetails();
  const isAdmin = employeeData?.roles?.includes("ROLE_ADMIN");

    const isManagerAndAdmin = employeeData?.roles?.includes(
    "ROLE_ADMIN",
    "ROLE_MANAGER"
  );


  return (
    <div className={styles.wrap}>
      <section className={styles.grid}>
        {isAdmin && (

          <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.leftSide}>
              <h3 className={styles.cardTitle}>Attendance Statistics</h3>
              <p className={styles.cardSubtitle}>
                Monthly Performance Overview
              </p>
            </div>
            <div className={styles.infoIcon}>i</div>
          </div>

          <div className={styles.attendanceBody}>
            {/* Pie Chart */}
            <div className={styles.chartSection}>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Section */}
            <div className={styles.summarySection}>
              <div className={styles.totalDays}>
                <div className={styles.totalNum}>26</div>
                <span className={styles.totalLabel}>Total Days</span>
              </div>

              {/* Legend */}
              <div className={styles.legendList}>
                {pieData.map((p, i) => (
                  <div key={p.name} className={styles.legendItem}>
                    <span
                      className={styles.legendDot}
                      style={{ background: COLORS[i] }}
                    ></span>

                    <div>
                      <div className={styles.legendName}>{p.name}</div>
                      <div className={styles.legendValue}>{p.value} days</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        )}
        

        {isAdmin && (

          <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Metro used by People</div>
            </div>
            <div className={styles.cardSmall}>i</div>
          </div>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={barData}
                margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorU" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5BC0BE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5BC0BE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="Product"
                  stroke="#6a63ff"
                  fill="url(#colorU)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        )}
        

        {/* CALENDAR CARD */}

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Calendar</div>
            </div>
            <div className={styles.cardSmall}>
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          <div className={styles.calendar}>
            <div className={styles.calendarWeek}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, k) => (
                <span key={k} className={styles.weekDay}>
                  {d}
                </span>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {(() => {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const startDay = new Date(year, month, 1).getDay();

                const cells = [];

                // empty cells before month starts
                for (let i = 0; i < startDay; i++) {
                  cells.push(<span key={`e-${i}`} />);
                }

                // actual days
                for (let day = 1; day <= daysInMonth; day++) {
                  const isToday =
                    day === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth();

                  cells.push(
                    <span
                      key={day}
                      className={`${styles.day} ${
                        isToday ? styles.activeDay : ""
                      }`}
                    >
                      {day}
                    </span>
                  );
                }

                return cells;
              })()}
            </div>
          </div>
        </div>

        {isManagerAndAdmin && (

          <div className={styles.cardWide}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Position Wise Recruitment</div>
            </div>
            <div className={styles.cardSmall}>Yearly</div>
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Product" stackId="a" fill="#6a63ff" />
                <Bar dataKey="Market" stackId="a" fill="#5BC0BE" />
                <Bar dataKey="Testing" stackId="a" fill="#FFB86B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        )}
        
        {isManagerAndAdmin && (

        <div className={styles.cardTable}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Employee Approvel</div>
            </div>
            <div className={styles.cardSmall}>Show All</div>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Award</th>
                <th>Date</th>
                <th>Leave</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jonathan Ibrahim Sheikh</td>
                <td>Production</td>
                <td>Coby Beach</td>
                <td>30-11-2023</td>
                <td>
                  <span className={styles.badgeApproved}>Approved</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Maisha Lucy</td>
                <td>Electrical</td>
                <td>Best Employee</td>
                <td>01-06-2024</td>
                <td>
                  <span className={styles.badgeDecline}>Decline</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        )}
        

        


      </section>
    </div>
  );
}
