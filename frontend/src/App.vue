<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <BContainer>
            <BRow>
                <BCol lg="12">
                    <div>
                        <BNavbar
                            toggleable="lg"
                            variant="dark"
                            v-b-color-mode="'dark'"
                        >
                            <BNavbarBrand href="#">NavBar</BNavbarBrand>
                            <BNavbarToggle target="nav-collapse" />
                            <BCollapse id="nav-collapse" is-nav>
                                <BNavbarNav>
                                    <BNavItem href="#">
                                        <RouterLink to="/">Home</RouterLink>
                                    </BNavItem>
                                    <BNavItem href="#">
                                        <RouterLink to="/about"
                                            >About</RouterLink
                                        >
                                    </BNavItem>
                                    <BNavItem href="#">
                                        <RouterLink to="/listing"
                                            >Individual listing</RouterLink
                                        >
                                    </BNavItem>
                                </BNavbarNav>
                                <!-- Right aligned nav items -->
                                <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                                    <BNavItemDropdown right>
                                        <!-- Using 'button-content' slot -->
                                        <template #button-content>
                                            <em>User</em>
                                        </template>
                                        <BDropdownItem href="#"
                                            >Profile</BDropdownItem
                                        >
                                        <BDropdownItem href="#"
                                            >Sign Out</BDropdownItem
                                        >
                                    </BNavItemDropdown>
                                </BNavbarNav>
                                <BNavForm class="d-flex">
                                    <BFormInput
                                        class="me-2"
                                        placeholder="Search"
                                    />
                                    <BButton
                                        type="submit"
                                        variant="outline-success"
                                        >Search</BButton
                                    >
                                </BNavForm>
                            </BCollapse>
                        </BNavbar>
                    </div>
                </BCol>
            </BRow>
        </BContainer>
    </header>

    <RouterView />
</template>

<style scoped>
body {
    padding: 0;
}
</style>
