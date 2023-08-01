package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func setRouter(router *gin.Engine) {
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pages/index.html", gin.H{
			"title": "메인페이지",
			"url":   "/index",
		})
	})
}

func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/pages/*.html")
	setRouter(router)
	_ = router.Run(":8080")
}
