import { HotelSearchResponse, HotelType } from "@/types/HotelType";
import { RegisterFormData } from "../pages/Register";
import { SignInFormData } from "../pages/Signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export const register = async (formData: RegisterFormData) => {
    console.log(API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)

    })

    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }




}

export const signIn = async (formData: SignInFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/auth/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)

        })
    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message)
    }

    return body

}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    })

    if (!response) {
        throw new Error("Error during sign out")
    }
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Token invalid")
    }
    return response.json()
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData
    })

    if (!response.ok) {
        console.log(response.json())
        throw new Error("Faild to add hotel")
    }

    return response.json()

}


export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "GET",
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error fetching hotels")
    }

    return response.json()
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Error fetching hotels")
    }

    return response.json()
}


export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")} `, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Faild to update Hotel")
    }

    return response.json()
}


export type SearchParams = {
    destination?: string
    checkIn?: string
    checkOut?: string
    adultCoutn?: string
    childCount?: string
    page?: string
    facilities?: string[]
    types?: string[]
    stars?: string[]
    maxPrice?: string
    sortOptions?: string

}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams
    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultCoutn", searchParams.adultCoutn || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")

    queryParams.append("maxPrice", searchParams.maxPrice || "")
    queryParams.append("sortOptions", searchParams.sortOptions || "")

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility))

    searchParams.types?.forEach((type) => queryParams.append("types", type))
    searchParams.stars?.forEach((star) => queryParams.append("stars", star))

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`
    )
    if (!response) {
        throw new Error("Error fetching hotels")
    }

    return response.json()
}


export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
    if (!response.ok) {
        throw new Error("Erro fetching hotels")
    }

    return response.json()
}