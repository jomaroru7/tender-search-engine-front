import type { Meta, StoryObj } from "@storybook/react";
import CompanyGuard from "./CompanyGuard";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../store";

const makeStore = (company: any) =>
    configureStore({
        reducer: rootReducer,
        preloadedState: {
            companyReducer: company,
            cpvReducer: { cpvs: {} },
            tenderReducer: { tenders: [], totalResults: 0, page: 1, pageSize: 10, filters: { invoicing: 0, place: "", activity: "" } },
        },
    });

const meta: Meta<typeof CompanyGuard> = {
    title: "Components/CompanyGuard",
    component: CompanyGuard,
    decorators: [
        (_Story, context) => {
            const company = context.parameters.company || { name: "", location: "", budget: 0, description: "" };
            const store = makeStore(company);
            return (
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <CompanyGuard>
                                        <div>Página protegida</div>
                                    </CompanyGuard>
                                }
                            />
                            <Route path="/register" element={<div>Página de registro</div>} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof CompanyGuard>;

export const Registered: Story = {
    parameters: {
        company: {
            name: "Mi Empresa",
            location: "Madrid",
            budget: 10000,
            description: "Servicios",
        },
    },
};

export const NotRegistered: Story = {
    parameters: {
        company: {
            name: "",
            location: "",
            budget: 0,
            description: "",
        },
    },
};